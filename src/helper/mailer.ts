import bcryptjs from 'bcryptjs';
import { verify } from 'crypto';
import nodemailer from 'nodemailer';
import User from '@/model/usermodel'

export const sendMail = async({email,emailType ,userId} : any) => {
    // Create a test account or replace with real credentials.
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken : hashedToken , verifyTokenExpiry : Date.now() + 360000})
        }
        else if(emailType === 'RESET'){
          await User.findByIdAndUpdate(userId,{forgetPasswordToken : hashedToken , forgetPasswordTokenExpiry : Date.now() + 36000 })
        }
        const transporter = nodemailer.createTransport({
          host: process.env.MAILTRAP_HOST,
          port: Number(process.env.MAILTRAP_PORT),
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
          },
          secure: false 
        });

        const mailOptions = {
            from: "shubh123@gmail.com",
            to: "receiver123@example.com",
            subject: "Hello ✔",
            html: "<b>Hello world?</b>", // HTML body
          }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;
      
    } catch (error : any) {
       throw new Error(error.message)

    }

}
