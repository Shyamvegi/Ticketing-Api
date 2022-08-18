import mongoose from "mongoose";
const { Schema, model } = mongoose;
const tickets = model('ticket',new Schema({
    title: String,
    description:String,
    status: {
        type:String,
        default:"open",
    },
    priority: {
        type: String,
        default: "low",
    },
    assignedTo: String,
},{
    timestamps: {createdAt: true}
}))

export default tickets;

