import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    });
};

export const sendVerificationEmail = async (to: string, token: string) => {
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    const html = `
        <h2>Verify Your Email</h2>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationLink}" style="padding:10px 20px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px;">Verify Email</a>
        <p>This link expires in 60 minutes.</p>
    `;
    await sendEmail(to, 'Verify your email', html);
};

export const sendForgotPasswordEmail = async (to: string, token: string) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const html = `
        <h2>Reset Your Password</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="padding:10px 20px; background:#f44336; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
        <p>This link expires in 60 minutes.</p>
    `;
    await sendEmail(to, 'Reset Your Password', html);
};
