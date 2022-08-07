import user from "../models/Users.js";
import tickets from "../models/Tickets.js";
import jwt from 'jsonwebtoken';
import { json } from "express";

const home = (req, res) => {
    res.send("Ticketing Api");
}

const register = async (req, res) => {
    try {
        const { username, role } = req.body;
        var message=undefined;
        if (!username || !role) {
            message = "invalid details";
        }
        else if (role!=="admin" && role!=="employee") {
            message = "role must be employee or admin";
        }
        if(message){
            return res.status(400).json({'message':message}).end();
        }
        const isUserExist = await user.exists({ 'username': username });
        console.log(isUserExist);
        if (isUserExist) {
            return res.status(300).json({
                'message': "Username already existed"
            }).end();
        }

        await user.create(
            { username, role},
            (err => {
                console.log(err);
            })
        );
        console.log(`${username} register successfully`)

        const payload = {
            data: username
        }
        const token = jwt.sign(payload, 'qweasd123@', { expiresIn: 360000 });
        console.log('token', token);
        res.status(200).json({ "Auth Token": token }).end();
    }
    catch (err) {
        console.log(err)
    }
}

const raiseTicket = async (req, res) => {
    try {
        console.log(req.authUser);
        const isExist = await user.exists({ 'username': req.authUser, "role": "admin" });
        if (!isExist) res.status(400).json({ 'message': 'unauthorised access' }).end();

        const { title, description } = req.body;
        const ticketdata = await tickets.create({ title, description });
        res.status(200).json({ 'message': ticketdata['_id'] }).end();
    }
    catch (err) {
        console.log(err);
    }
}

const getAllTickets = async (req, res) => {
    const ticketsData = await tickets.find();
    res.status(200).json({ 'message': ticketsData })
}

const getTickets = async (req, res) => {
    try {
        const { status, title, priority } = req.params;
        if (status) {
            const data = await tickets.find({ 'status': status });
            res.status(200).json({ 'message': data }).end();
        }
        else if (title) {
            const data = await tickets.find({ 'status': title });
            res.status(200) / json({ 'message': data }).end();
        }
        else if (priority) {
            const data = await tickets.find({ 'priority': priority });
            res.status(200).json({ 'message': data }).end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'message': "Internal Error" }).end();
    }
}
const closeTicket = (req, res) => {

}
const delTicket = async (req, res) => {
    try {
        const data = await tickets.findOneAndDelete(req.ticketID);
        if (data) {
            res.status(200).json({ 'message': 'Deleted' }).end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'message': "Internal error" });
    }
}


export { raiseTicket, delTicket, getTickets,getAllTickets, closeTicket, register, home };