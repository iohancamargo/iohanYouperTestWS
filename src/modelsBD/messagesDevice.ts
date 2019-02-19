import * as mongoose from 'mongoose';

// Interface for TS
export interface IMessageDevice extends mongoose.Document {
    msgId: string;
    macAddress: string;
    dateRead: Date;
};

// Actual DB model
export var messageDeviceSchema = new mongoose.Schema({
    msgId: String,
    macAddress: String,
    dateRead: { type: Date, default: Date.now }
});

export const MessageDevice = mongoose.model<IMessageDevice>('MessageDevice', messageDeviceSchema);