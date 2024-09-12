import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}) =>{
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, 
        {
          verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 10 * 60 * 1000
        })
    } else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId, 
        {
          forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 10 * 60 * 1000
        })
    }
    // smtp configuration 
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    const mailoptions ={
            from: 'shevaitverma@outlook.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste this link in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
    }     
    const mailResponse = await transport.sendMail(mailoptions)
    return mailResponse
  } catch (error) {
      throw new Error((error as Error).message)
  }
}