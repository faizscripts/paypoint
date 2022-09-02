import connectDB from "../../utils/db";
import {Topup} from "../../models/topup";
import {User} from "../../models/users";
import nodemailer from "nodemailer";

export default async function handler(req, res) {

    let {recipient, amount, user} = req.body

    try {
        await connectDB()

        let receiver

        let topup

        if (recipient) {
            receiver = await User.findOne({email: recipient});
            if (!receiver) {
                let formError = {}
                formError.recipient = "user with this email address does not exist"
                return res.status(200).json(formError)
            }

            receiver = await User.findByIdAndUpdate(receiver._id, {
                $inc: {balance: amount}
            }, {new: true})

            topup = new Topup({
                userID: user._id,
                recipientID: receiver._id,
                amount: amount
            });

        } else {
            user = await User.findByIdAndUpdate(user._id, {
                $inc: {balance: amount}
            }, {new: true})

            topup = new Topup({
                userID: user._id,
                amount: amount
            });
        }

        await topup.save()

        res.status(200).json(user)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        if (recipient){
            const receiverMailOptions = {
                from: `"Paypoint" ${process.env.EMAIL}`,
                to: receiver.email,
                subject: `Successful top up of Ksh. ${amount} from ${user.name} (Paypoint)`,
                html: `
        Dear ${receiver.name}, <br>
        <br>
        You have received a Paypoint top up of Ksh. ${amount} from ${user.name} (${receiver.email}). Your new account balance is Ksh. <b>${receiver.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
            }

            const senderMailOptions = {
                from: `"Paypoint" ${process.env.EMAIL}`,
                to: user.email,
                subject: `Successful top up of Ksh. ${amount} to ${receiver.name} (Paypoint)`,
                html: `
        Dear ${receiver.name}, <br>
        <br>
        You have sent a Paypoint top up of Ksh. ${amount} to ${receiver.name} (${receiver.email}).
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
            }

            await transport.sendMail(receiverMailOptions)

            await transport.sendMail(senderMailOptions)

        } else {
            const mailOptions = {
                from: `"Paypoint" ${process.env.EMAIL}`,
                to: user.email,
                subject: `Successful top up of Ksh. ${amount} (Paypoint)`,
                html: `
        Dear ${user.name}, <br>
        <br>
        Your top of Ksh. ${amount} at Paypoint was successful. Your new account balance is Ksh. <b>${user.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
            }

            await transport.sendMail(mailOptions)
        }

    } catch (e) {
        res.status(500).end()
    }


}