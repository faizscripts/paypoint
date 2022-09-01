import mongoose, {models, model, Schema} from "mongoose";

const topupSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipientID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        min: 0,
        default: 0,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Topup = models.Topup || mongoose.model('Topup', topupSchema);