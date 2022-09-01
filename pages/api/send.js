import connectDB from "../../utils/db";
import {Send} from "../../models/send";
import {User} from "../../models/users";
import nodemailer from "nodemailer";

export default async function handler(req, res) {

    let {email, phone, amount, user} = req.body

    try {
        await connectDB()

        let formError = {}

        if (user.balance < amount){
            formError.amount = `Insufficient balance. Your current balance is ${user.balance}`
            return res.status(200).json(formError)
        }

        let receiver

        if (email) {
            receiver = await User.findOne({email});
            if (!receiver) {
                formError.email = "user with this email address does not exist"
                return res.status(200).json(formError)
            }
        } else if (phone) {
            receiver = await User.findOne({phone});
            if (!receiver) {
                let formError = {}
                formError.phone = "user with this phone number does not exist"
                return res.status(200).json(formError)
            }
        }

        receiver = await User.findByIdAndUpdate(receiver._id, {
            $inc: {balance: amount}
        }, {new: true})

        let sender = await User.findByIdAndUpdate(user._id, {
            $inc: {balance: -amount}
        }, {new: true})

        const send = new Send({
            senderID: user._id,
            receiverID: receiver._id,
            amount: amount
        });

        await send.save()

        res.status(200).json(sender)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const senderMailOptions = {
            from: `"Paypoint" ${process.env.EMAIL}`,
            to: sender.email,
            subject: `Sent ksh. ${amount} to ${receiver.name} (Paypoint)`,
            html: `
        Dear ${sender.name}, <br>
        
        Your successfully sent Ksh. ${amount} to ${receiver.name}. Your new account balance is Ksh. <b>${sender.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
        }

        const receiverMailOptions = {
            from: `"Paypoint" ${process.env.EMAIL}`,
            to: receiver.email,
            subject: `Received ksh. ${amount} from ${sender.name} (Paypoint)`,
            html: `
        Dear ${receiver.name}, <br>
        
        Your successfully received Ksh. ${amount} from ${sender.name}. Your new account balance is Ksh. <b>${receiver.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
        }

        await transport.sendMail(senderMailOptions)

        await transport.sendMail(receiverMailOptions)

    } catch (e) {
        res.status(500).end()
    }

}