import mongoose, {models, model, Schema} from "mongoose";

const withdrawSchema = new mongoose.Schema({
    agentNumber: {
        type: Number,
        min: 0,
        trim: true
    },
    phone: {
        type: Number,
        min: 0,
        trim: true
    },
    userID: {
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

export const Withdraw = models.Withdraw || mongoose.model('Withdraw', withdrawSchema);