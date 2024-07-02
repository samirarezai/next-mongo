import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async({email, emailType, userId}:any) =>{
    try {

        // Create a hash token based on the user's ID
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

// Update the user document in the database with the generated token and expiry time
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
            )
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
            )
        }

        // Create a nodemailer transport
        let transport = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'alejandrin67@ethereal.email',
                pass: 'QPBArZvw1DUgCCaYf3'
            }
        });

        // Compose email options
        const mailOptions = {
            from: 'samirarezai1996@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }

        // Send the email
        const mailresponse = await transport.sendMail(mailOptions);
        console.log('Message sent: %s', mailresponse.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailresponse));
        return mailresponse


    } catch (error: any) {
        throw new Error(error.message);

    }
}