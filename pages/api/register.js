import connectDB from "../../utils/db";
import {User, validate} from "../../models/users";
const _ = require('lodash');
const bcrypt = require('bcrypt');

export default async function handler(req, res) {

    let formData = {error: null}

    if (req.method === "GET"){
        res.status(200).json(formData)
    } else if (req.method === "POST"){
        try{
            await connectDB()

            const {error} = validate(req.body);
            if (error) {
                formData.error = error.details[0]
                return res.status(200).json(formData)
            }

            let existingEmail = await User.findOne({email: req.body.email});
            if (existingEmail) {
                formData.error = "Email already registered, kindly use another email"
                return res.status(200).json(formData)
            }

            let existingPhone = await User.findOne({phone: req.body.phone});
            if (existingPhone) {
                formData.error = "Phone number already registered, kindly use another number"
                return res.status(200).json(formData)
            }

            let user = new User(
                _.pick(req.body, ['name', 'email', 'phone', 'password'])
            );

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(user.password, salt);

            user = await user.save();

            const token = user.generateLoginToken();

            res.status(200).redirect('/').end()

        } catch (e) {
            res.status(500).end()
        }
    }




}