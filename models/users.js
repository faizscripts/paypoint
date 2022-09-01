import mongoose, {models, model, Schema} from "mongoose";
import jwt from "jsonwebtoken"
import Joi from "joi"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        min: 0,
        trim: true,
        unique: true
    },
    balance:{
        type: Number,
        min: 0,
        default: 0
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

export const User = models.User || mongoose.model('User', userSchema);

export function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255),
        email: Joi.string().email().min(3).max(255),
        phone: Joi.number(),
        password: Joi.string().min(8).max(50),
        confirm: Joi.any().equal(Joi.ref('password')).options({ messages: { 'any.required': 'passwords do not match'} })
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(user, options);
}