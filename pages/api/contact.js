import nodemailer from "nodemailer";

export default async function handler(req, res) {
    const {name, email, phone, message} = req.body

    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    })

    const mailOptions = {
        from: `"${name}" ${process.env.EMAIL}`,
        to: process.env.EMAIL,
        subject: `PAYPOINT MAIL FROM: ${name}`,
        html: `
        Name: ${name} <br>
        Email: ${email} <br>
        Phone: ${phone} <br>
        Message: ${message} <br>
        `,
    }

    try {
        await transport.sendMail(mailOptions)
        res.status(200).end()
    } catch (e) {
        console.log(e);
        res.status(500).end()
    }


}