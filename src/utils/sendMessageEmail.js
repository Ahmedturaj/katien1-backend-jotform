import nodemailer from "nodemailer";
import config from "../config/index.js";

const sendEmailMessage = async ({ to, subject, html, from }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.email.emailAddress,
        pass: config.email.emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `${from} <${config.email.emailAddress}>`,
      to,
      subject,
      html,
      replyTo: from,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default sendEmailMessage;
