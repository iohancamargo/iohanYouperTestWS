import * as mongoose from 'mongoose';

// Interface for TS
export interface IMessagesModel extends mongoose.Document {
    title: string;
    desc: string;
    read: Boolean;
    animation: Boolean;
    typeOfAnimation: string;
    created: Date;
};

// Actual DB model
export var messageSchema = new mongoose.Schema({
    title: String,
    desc: String,
    read: { type: Boolean, default: false},
    animation: Boolean,
    typeOfAnimation: String,
    created: { type: Date, default: Date.now }
});

export const Message = mongoose.model<IMessagesModel>('Message', messageSchema);