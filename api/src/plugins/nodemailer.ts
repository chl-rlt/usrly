import nodemailer from "nodemailer";
export async function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE !== "false", // secure by default
    ignoreTLS: process.env.MAIL_SECURE === "false",
  });
}
