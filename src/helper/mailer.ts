import nodemailer from 'nodemailer';

export const sendMail = async({email,emailType ,userId} : any) => {
    // Create a test account or replace with real credentials.
    try {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
          },
        });

        const mailOptions = {
            from: "shubh9142996613@gmail.com",
            to: "rajlucky.king2007@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?", // plain‑text body
            html: "<b>Hello world?</b>", // HTML body
          }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;
      
    } catch (error : any) {
        throw new error(error.message);

    }

}
