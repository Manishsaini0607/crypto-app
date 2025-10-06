import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/**
 * Single-file fixed auth controllers + mail helpers
 *
 * Required env variables:
 * EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, FRONTEND_URL, JWT_KEY
 *
 * NOTE: For Gmail use an App Password (with 2FA enabled) in EMAIL_PASS.
 */

// --- Transporter (kept here, no external file changes) ---
const emailPort = Number(process.env.EMAIL_PORT) || 587;
const emailSecure = process.env.EMAIL_SECURE
  ? process.env.EMAIL_SECURE === "true"
  : emailPort === 465; // auto secure for 465

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: emailPort,
  secure: emailSecure, // true for 465, false for 587 STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // pooling + timeouts help on cloud providers
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  connectionTimeout: 15000, // ms
  greetingTimeout: 10000, // ms
  socketTimeout: 20000, // ms
  tls: {
    // helpful in some networks; if you face TLS errors, keep; otherwise you can remove it
    rejectUnauthorized: false,
  },
});

// verify transporter at startup for clearer errors
transporter
  .verify()
  .then(() => {
    console.log("SMTP transporter verified: ready to send emails");
  })
  .catch((err) => {
    console.error("SMTP transporter verification failed:");
    console.error(err);
  });

// small helper for backoff between retries
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// --- Safe send wrapper with detailed logs + retries for transient errors ---
const sendMailSafely = async (opts: nodemailer.SendMailOptions) => {
  const maxAttempts = 3;
  let attempt = 0;
  let lastError: any;

  while (attempt < maxAttempts) {
    try {
      const info = await transporter.sendMail(opts);
      console.log("Email sent:", info.messageId);
      return info;
    } catch (err: any) {
      lastError = err;
      const code = err?.code as string | undefined;
      const isTransient =
        code === "ETIMEDOUT" ||
        code === "ECONNECTION" ||
        code === "ECONNRESET" ||
        code === "EAI_AGAIN" ||
        code === "ENOTFOUND" ||
        err?.command === "CONN";

      attempt += 1;
      console.error(`Failed to send email (attempt ${attempt}/${maxAttempts}):`);
      if (code) console.error("Error code:", code);
      if (err?.response) console.error("SMTP response:", err.response);
      console.error(err);

      if (!isTransient || attempt >= maxAttempts) {
        throw err;
      }

      const backoffMs = 500 * Math.pow(2, attempt - 1); // 500ms, 1s, 2s
      await delay(backoffMs);
    }
  }

  throw lastError;
};

// --- Mail helper: generic send ---
const sendEmail = async (to: string, subject: string, html: string) => {
  await sendMailSafely({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

// --- Mail helper: verification ---
const sendVerificationEmail = async (to: string, token: string, firstName?: string) => {
  const frontend = process.env.FRONTEND_URL || "";
  const verificationLink = `${frontend}/email-verify/${token}`;
  const html = `
    <h2>Welcome ${firstName || "User"} 🚀</h2>
    <p>Please verify your email by clicking the button below:</p>
    <a href="${verificationLink}"
       style="display:inline-block; margin-top:10px; padding:10px 20px; background:#4CAF50; color:#fff; border-radius:5px; text-decoration:none;">
       Verify Email
    </a>
    <p>This link will expire in <b>60 minutes</b>.</p>
  `;
  await sendEmail(to, "Email Verification", html);
};

// --- Mail helper: forgot password ---
const sendForgotPasswordEmail = async (to: string, token: string, firstName?: string) => {
  const frontend = process.env.FRONTEND_URL || "";
  const resetLink = `${frontend}/forgot-password-verify/${token}`;
  const html = `
    <h2>Reset Your Password 🔑</h2>
    <p>Hello ${firstName || "User"},</p>
    <p>Click the button below to reset your password:</p>
    <a href="${resetLink}"
       style="display:inline-block; margin-top:10px; padding:10px 20px; background:#f44336; color:#fff; border-radius:5px; text-decoration:none;">
       Reset Password
    </a>
    <p>This link will expire in <b>60 minutes</b>.</p>
  `;
  await sendEmail(to, "Password Reset Request", html);
};

// -------------------- Signup --------------------
export const signupUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password) return next(createHttpError(400, "Email and password are required"));

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "Email Already Exist!"));

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isUserVerified: false,
    });

    await user.save();

    // Create verification token for later email verification
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });
    await user.updateOne({ $set: { verifyToken: jwtToken } });
    
    res.status(201).json({ 
      message: "User created successfully. Please verify your email to activate your account.",
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error("signupUser error:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// -------------------- Signin --------------------
export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(createHttpError(400, "Email and password are required"));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));
    if (!user.isUserVerified) return next(createHttpError(406, "User not Verified"));

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return next(createHttpError(401, "Not Valid Password!"));

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.id,
      },
      process.env.JWT_KEY || "",
      { expiresIn: "7d" }
    );

    // keep same behavior as original (no extra cookie options)
    res.cookie("jwt", token);
    res.json({ firstName: user.firstName, lastName: user.lastName, token });
  } catch (error) {
    console.error("signinUser error:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// -------------------- Send Verification Email (manual trigger) --------------------
export const sendVerificationMail: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(createHttpError(400, "Email is required"));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    if (user.isUserVerified) {
      return next(createHttpError(406, "User already verified"));
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });

    try {
      await sendVerificationEmail(email, jwtToken, user.firstName);
    } catch (mailErr) {
      console.error("Failed to send verification email (manual):", mailErr);
      return next(createHttpError(500, "Failed to send verification email"));
    }

    await user.updateOne({ $set: { verifyToken: jwtToken } });
    res.json({ message: "Verification email has been sent to your inbox." });
  } catch (error) {
    console.error("sendVerificationMail error:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// -------------------- Verify Email --------------------
export const verifyUserMail: RequestHandler = async (req, res, next) => {
  const { token }: { token: string } = req.body;

  if (!token) return next(createHttpError(400, "Token is required"));

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_KEY || "");
    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    await user.updateOne({
      $set: { isUserVerified: true },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Email Verified!" });
  } catch (error) {
    console.error("verifyUserMail error:", error);
    return next(createHttpError(401, "Token Invalid or Expired"));
  }
};

// -------------------- Forgot Password Email --------------------
export const sendForgotPasswordMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  if (!email) return next(createHttpError(400, "Email is required"));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "Email Not Valid!"));

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });

    try {
      await sendForgotPasswordEmail(email, jwtToken, user.firstName);
    } catch (mailErr) {
      console.error("Failed to send password reset email:", mailErr);
      return next(createHttpError(500, "Failed to send password reset email"));
    }

    await user.updateOne({ $set: { verifyToken: jwtToken } });
    res.json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("sendForgotPasswordMail error:", error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

// -------------------- Verify Forgot Password --------------------
export const verifyForgotMail: RequestHandler = async (req, res, next) => {
  const { token, password }: { token: string; password: string } = req.body;

  if (!token || !password) return next(createHttpError(400, "Token and new password are required"));

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_KEY || "");
    const user = await User.findById(decodedToken.userId);
    if (!user) return next(createHttpError(401, "Token Invalid"));

    const encryptedPassword = await bcrypt.hash(password, 8);

    await user.updateOne({
      $set: { password: encryptedPassword },
      $unset: { verifyToken: 0 },
    });

    res.json({ message: "Password Changed!" });
  } catch (error) {
    console.error("verifyForgotMail error:", error);
    return next(createHttpError(401, "Token Invalid or Expired"));
  }
};
