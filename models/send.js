import mongoose, {models, model, Schema} from "mongoose";

const sendSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiverID: {
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

export const Send = models.Send || mongoose.model('Send', sendSchema);