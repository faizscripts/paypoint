import connectDB from "../../utils/db";
import {User} from "../../models/users";
import bcrypt from "bcrypt"

export default async function handler(req, res) {

    let formError = {}

    try {
        await connectDB()

        let user = await User.findOne({email: req.body.email});
        if (!user) {
            formError.email = "email not registered yet, create an account first."
            return res.status(200).json(formError)
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            formError.password = "incorrect password"
            return res.status(200).json(formError)
        }

        const token = user.generateLoginToken();

        const data = {
            name: user.name,
            token
        }

        res.status(200).json(data).end()

    } catch (e) {
        res.status(500).end()
    }

}