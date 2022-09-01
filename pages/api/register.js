import connectDB from "../../utils/db";
import {User, validate} from "../../models/users";
import _ from "lodash"
import bcrypt from "bcrypt"

export default async function handler(req, res) {

    let formError = {}

    try {
        await connectDB()

        const {error} = validate(req.body);
        if (error) {
            formError.validate = error.details[0]
            return res.status(200).json(formError)
        }

        let existingEmail = await User.findOne({email: req.body.email});
        if (existingEmail) {
            formError.email = "email already exists, kindly use another email"
            return res.status(200).json(formError)
        }

        let existingPhone = await User.findOne({phone: req.body.phone});
        if (existingPhone) {
            formError.phone = "phone number already exists, kindly use another number"
            return res.status(200).json(formError)
        }

        let user = new User(
            _.pick(req.body, ['name', 'email', 'phone', 'password'])
        );

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        user = await user.save();

        const token = user.generateLoginToken();

        const data = {
            name: req.body.name,
            token
        }

        res.status(200).json(data).end()

    } catch (e) {
        res.status(500).end()
    }


}