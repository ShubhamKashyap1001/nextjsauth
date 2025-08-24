import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '@/model/usermodel'

export const sendMail = async({email,emailType ,userId} : any) => {
    // Create a test account or replace with real credentials.
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
              $set : {verifyToken : hashedToken , verifyTokenExpire : new Date(Date.now() + 360000)}
        }   )
        }
        else if(emailType === 'RESET'){
          await User.findByIdAndUpdate(userId,{
            $set :{forgetPasswordToken : hashedToken , forgetPasswordTokenExpire : new Date(Date.now() + 360000 )}
          })
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

        // const mailOptions = {
        //     from: "shubh123@gmail.com",
        //     to: "receiver123@example.com",
        //     subject: "Hello ✔",
        //     html: "<b>Hello world?</b>", // HTML body
        //   }

        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;
      
    } catch (error : any) {
       throw new Error(error.message)

    }

}
