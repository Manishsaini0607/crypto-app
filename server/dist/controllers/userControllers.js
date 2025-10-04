"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotMail = exports.sendForgotPasswordMail = exports.verifyUserMail = exports.sendVerificationMail = exports.signinUser = exports.signupUser = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var User_1 = __importDefault(require("../model/User"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Single-file fixed auth controllers + mail helpers
 *
 * Required env variables:
 * EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, FRONTEND_URL, JWT_KEY
 *
 * NOTE: For Gmail use an App Password (with 2FA enabled) in EMAIL_PASS.
 */
// --- Transporter (kept here, no external file changes) ---
var transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        // helpful in some networks; if you face TLS errors, keep; otherwise you can remove it
        rejectUnauthorized: false,
    },
});
// verify transporter at startup for clearer errors
transporter
    .verify()
    .then(function () {
    console.log("SMTP transporter verified: ready to send emails");
})
    .catch(function (err) {
    console.error("SMTP transporter verification failed:");
    console.error(err);
});
// --- Safe send wrapper with detailed logs ---
var sendMailSafely = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var info, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, transporter.sendMail(opts)];
            case 1:
                info = _a.sent();
                console.log("Email sent:", info.messageId);
                return [2 /*return*/, info];
            case 2:
                err_1 = _a.sent();
                console.error("Failed to send email:");
                if (err_1.code)
                    console.error("Error code:", err_1.code);
                if (err_1.response)
                    console.error("SMTP response:", err_1.response);
                console.error(err_1);
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
// --- Mail helper: generic send ---
var sendEmail = function (to, subject, html) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sendMailSafely({
                    from: process.env.EMAIL_FROM,
                    to: to,
                    subject: subject,
                    html: html,
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// --- Mail helper: verification ---
var sendVerificationEmail = function (to, token, firstName) { return __awaiter(void 0, void 0, void 0, function () {
    var frontend, verificationLink, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                frontend = process.env.FRONTEND_URL || "";
                verificationLink = "".concat(frontend, "/email-verify/").concat(token);
                html = "\n    <h2>Welcome ".concat(firstName || "User", " \uD83D\uDE80</h2>\n    <p>Please verify your email by clicking the button below:</p>\n    <a href=\"").concat(verificationLink, "\"\n       style=\"display:inline-block; margin-top:10px; padding:10px 20px; background:#4CAF50; color:#fff; border-radius:5px; text-decoration:none;\">\n       Verify Email\n    </a>\n    <p>This link will expire in <b>60 minutes</b>.</p>\n  ");
                return [4 /*yield*/, sendEmail(to, "Email Verification", html)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// --- Mail helper: forgot password ---
var sendForgotPasswordEmail = function (to, token, firstName) { return __awaiter(void 0, void 0, void 0, function () {
    var frontend, resetLink, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                frontend = process.env.FRONTEND_URL || "";
                resetLink = "".concat(frontend, "/forgot-password-verify/").concat(token);
                html = "\n    <h2>Reset Your Password \uD83D\uDD11</h2>\n    <p>Hello ".concat(firstName || "User", ",</p>\n    <p>Click the button below to reset your password:</p>\n    <a href=\"").concat(resetLink, "\"\n       style=\"display:inline-block; margin-top:10px; padding:10px 20px; background:#f44336; color:#fff; border-radius:5px; text-decoration:none;\">\n       Reset Password\n    </a>\n    <p>This link will expire in <b>60 minutes</b>.</p>\n  ");
                return [4 /*yield*/, sendEmail(to, "Password Reset Request", html)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// -------------------- Signup --------------------
var signupUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, existingUser, hashedPassword, user, jwtToken, mailErr_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Email and password are required"))];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, next((0, http_errors_1.default)(422, "Email Already Exist!"))];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
            case 3:
                hashedPassword = _b.sent();
                user = new User_1.default({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    isUserVerified: false,
                });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 9]);
                return [4 /*yield*/, sendVerificationEmail(email, jwtToken, firstName)];
            case 6:
                _b.sent();
                return [3 /*break*/, 9];
            case 7:
                mailErr_1 = _b.sent();
                console.error("Failed to send verification email (signup):", mailErr_1);
                // store token so verification can be completed later
                return [4 /*yield*/, user.updateOne({ $set: { verifyToken: jwtToken } })];
            case 8:
                // store token so verification can be completed later
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "User created, but verification email could not be sent. Contact support.",
                    })];
            case 9: return [4 /*yield*/, user.updateOne({ $set: { verifyToken: jwtToken } })];
            case 10:
                _b.sent();
                res.status(201).json({ message: "User Created. Verification email sent." });
                return [3 /*break*/, 12];
            case 11:
                error_1 = _b.sent();
                console.error("signupUser error:", error_1);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Internal Server Error"))];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.signupUser = signupUser;
// -------------------- Signin --------------------
var signinUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isValidPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Email and password are required"))];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "User not Found!"))];
                if (!user.isUserVerified)
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "User not Verified"))];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                isValidPassword = _b.sent();
                if (!isValidPassword)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Not Valid Password!"))];
                token = jsonwebtoken_1.default.sign({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userId: user.id,
                }, process.env.JWT_KEY || "", { expiresIn: "7d" });
                // keep same behavior as original (no extra cookie options)
                res.cookie("jwt", token);
                res.json({ firstName: user.firstName, lastName: user.lastName, token: token });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error("signinUser error:", error_2);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Internal Server Error"))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signinUser = signinUser;
// -------------------- Send Verification Email (manual trigger) --------------------
var sendVerificationMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, jwtToken, mailErr_2, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!email)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Email is required"))];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "Email Not Valid!"))];
                if (user.isUserVerified) {
                    return [2 /*return*/, next((0, http_errors_1.default)(406, "User already verified"))];
                }
                jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, sendVerificationEmail(email, jwtToken, user.firstName)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                mailErr_2 = _a.sent();
                console.error("Failed to send verification email (manual):", mailErr_2);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Failed to send verification email"))];
            case 6: return [4 /*yield*/, user.updateOne({ $set: { verifyToken: jwtToken } })];
            case 7:
                _a.sent();
                res.json({ message: "Verification email has been sent to your inbox." });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.error("sendVerificationMail error:", error_3);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Internal Server Error"))];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationMail = sendVerificationMail;
// -------------------- Verify Email --------------------
var verifyUserMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                if (!token)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Token is required"))];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "");
                return [4 /*yield*/, User_1.default.findById(decodedToken.userId)];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
                return [4 /*yield*/, user.updateOne({
                        $set: { isUserVerified: true },
                        $unset: { verifyToken: 0 },
                    })];
            case 3:
                _a.sent();
                res.json({ message: "Email Verified!" });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error("verifyUserMail error:", error_4);
                return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid or Expired"))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.verifyUserMail = verifyUserMail;
// -------------------- Forgot Password Email --------------------
var sendForgotPasswordMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, jwtToken, mailErr_3, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                if (!email)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Email is required"))];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(404, "Email Not Valid!"))];
                jwtToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY || "", { expiresIn: "60m" });
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, sendForgotPasswordEmail(email, jwtToken, user.firstName)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                mailErr_3 = _a.sent();
                console.error("Failed to send password reset email:", mailErr_3);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Failed to send password reset email"))];
            case 6: return [4 /*yield*/, user.updateOne({ $set: { verifyToken: jwtToken } })];
            case 7:
                _a.sent();
                res.json({ message: "Password reset email sent." });
                return [3 /*break*/, 9];
            case 8:
                error_5 = _a.sent();
                console.error("sendForgotPasswordMail error:", error_5);
                return [2 /*return*/, next((0, http_errors_1.default)(500, "Internal Server Error"))];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.sendForgotPasswordMail = sendForgotPasswordMail;
// -------------------- Verify Forgot Password --------------------
var verifyForgotMail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, decodedToken, user, encryptedPassword, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, token = _a.token, password = _a.password;
                if (!token || !password)
                    return [2 /*return*/, next((0, http_errors_1.default)(400, "Token and new password are required"))];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || "");
                return [4 /*yield*/, User_1.default.findById(decodedToken.userId)];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid"))];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
            case 3:
                encryptedPassword = _b.sent();
                return [4 /*yield*/, user.updateOne({
                        $set: { password: encryptedPassword },
                        $unset: { verifyToken: 0 },
                    })];
            case 4:
                _b.sent();
                res.json({ message: "Password Changed!" });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _b.sent();
                console.error("verifyForgotMail error:", error_6);
                return [2 /*return*/, next((0, http_errors_1.default)(401, "Token Invalid or Expired"))];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.verifyForgotMail = verifyForgotMail;
