import connectDB from "../../utils/db";
import {Withdraw} from "../../models/withdraw";
import {User} from "../../models/users";
import nodemailer from "nodemailer";

export default async function handler(req, res) {

    let {agent, phone, amount, user} = req.body

    try {
        await connectDB()

        let formError = {}

        if (user.balance < amount){
            formError.amount = `Insufficient balance. Your current balance is ${user.balance}`
            return res.status(200).json(formError)
        }

        let account = await User.findByIdAndUpdate(user._id, {
            $inc: {balance: -amount}
        }, {new: true})

        let withdraw

        if (agent){
             withdraw = new Withdraw({
                userID: user._id,
                agentNumber: agent,
                amount: amount
            });
        } else if (phone){
            withdraw = new Withdraw({
                userID: user._id,
                phone: phone,
                amount: amount
            });
        }

        await withdraw.save()

        res.status(200).json(account)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })

        const cashMailOptions = {
            from: `"Paypoint" ${process.env.EMAIL}`,
            to: account.email,
            subject: `Withdrew ksh. ${amount} at Paypoint agent number ${agent}`,
            html: `
        Dear ${account.name}, <br>
        <br>
        Your withdrawal of Ksh. ${amount} at Paypoint agent number ${agent} was successful. Your new account balance is Ksh. <b>${account.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
        }

        const mpesaMailOptions = {
            from: `"Paypoint" ${process.env.EMAIL}`,
            to: account.email,
            subject: `Transferred ksh. ${amount} to ${phone} MPESA (Paypoint)`,
            html: `
        Dear ${account.name}, <br>
        <br>
        You have successfully transferred Ksh. ${amount} to ${phone} MPESA. Your new account balance is Ksh. <b>${account.balance}</b> 
        
        <br><br>
        Kind regards,<br>
        Paypoint
        `,
        }

        if (agent) {
            await transport.sendMail(cashMailOptions)
        } else if (phone) {
            await transport.sendMail(mpesaMailOptions)
        }



    } catch (e) {
        res.status(500).end()
    }


}