import * as mongoose from 'mongoose';

// Interface for TS
export interface IDeviceModel extends mongoose.Document {
    macAddress: string;
    created: Date;
};

// Actual DB model
export var deviceSchema = new mongoose.Schema({
    macAddress: String,
    created: { type: Date, default: Date.now }
});

export const Device = mongoose.model<IDeviceModel>('Device', deviceSchema);