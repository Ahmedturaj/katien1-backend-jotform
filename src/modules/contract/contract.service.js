import config from "../../config/index.js";
import sendEmailMessage from "../../utils/sendMessageEmail.js";
import sendMessageTemplate from "../../utils/sendMessageTemplate.js";

const sendMessage = async (payload) => {
  const { email, subject, message, phone, address } = payload;
  if (!email || !subject || !message || !phone || !address) {
    throw new Error("Please fill all the fields");
  }
  const result = await sendEmailMessage({
    from: email,
    to: config.email.adminEmail,
    subject,
    html: sendMessageTemplate({ email, subject, message }),
  });
  if (!result.success) {
    throw new Error(`Failed to send email: ${result.error}`);
  }

  return;
};

const contractService = {
  sendMessage,
};
export default contractService;
