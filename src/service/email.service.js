import nodemailer from "nodemailer";
import "dotenv/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default async function sendEmail(email, bookTitle, dueDate) {
  const mailOptions = {
    from: `"Community Library" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reminder: Book Due Date Approaching",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #f60;">Community Library Reminder</h2>
        <p>Dear user,</p>
        <p>This is a reminder that the book <strong>"${bookTitle}"</strong> is due on <strong>${dueDate}</strong>.</p>
        <p>Please make sure to return or renew it on time.</p>
        <p>Best regards,<br>Your Community Library</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email enviado com sucesso:", info.response);
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
  }
}
