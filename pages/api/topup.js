import connectDB from "../../utils/db";
import {Topup} from "../../models/topup";
import {User} from "../../models/users";
import nodemailer from "nodemailer";

export default async function handler(req, res) {

    let {recipient, amount, user} = req.body

    try {
        await connectDB()

        let account

        if (recipient) {
            account = await User.findOne({email: recipient});
            if (!account) {
                let formError = {}
                formError.recipient = "user with this email address does not exist"
                return res.status(200).json(formError)
            }
        } else {
            account = user
        }

        account = await User.findByIdAndUpdate(account._id, {
            $inc: {balance: amount}
        }, {new: true})

        const topup = new Topup({
            userID: user._id,
            recipientID: account._id,
            amount: amount
        });

        await topup.save()

        res.status(200).json(account)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const mailOptions = {
            from: `"Paypoint" ${process.env.EMAIL}`,
            to: account.email,
            subject: `Successful top up at Paypoint`,
            html: `
        Dear ${account.name}, <br>
        
        Your top at Paypoint was successful. Your new account balance is Ksh. <b>${account.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
        }

        await transport.sendMail(mailOptions)

    } catch (e) {
        res.status(500).end()
    }


}