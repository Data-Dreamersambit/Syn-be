import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (![name, email, subject, message].every(Boolean)) {
    throw new ApiError(400, "All fields are required"); }

  const transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
    const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.COMPANY_EMAIL,  
    subject: `[Contact Form] ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json(new ApiResponse(200, {}, "Message sent successfully"));
})

export const sendMailToUser = asyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Your Gmail address
      pass: process.env.MAIL_PASS,  
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json(new ApiResponse(200, {}, "Mail sent successfully"));
});