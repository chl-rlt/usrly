import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
export async function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE !== "false", // secure by default
    ignoreTLS: process.env.MAIL_SECURE === "false",
  });
}

export async function sendEmail(options: Mail.Options) {
  const transporter = await createTransporter();
  const mailOptions = {
    ...options,
  };
  await transporter.sendMail(mailOptions);
}
