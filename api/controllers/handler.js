import jwt from 'jsonwebtoken';
import user from "../models/Users.js";
import tickets from "../models/Tickets.js";
import {homepage,notfoundpage} from "../index.js";

//Homepage
const home = (req, res) => {
    res.send(homepage);
}

//Register Users
const register = async (req, res) => {
    try {
        const { username, role } = req.body;
        var message = undefined;
        if (!username || !role) {
            message = "invalid details";
        }
        else if (role !== "admin" && role !== "employee") {
            message = "role must be employee or admin";
        }
        if (message) {
            return res.status(400).json({ 'message': message }).end();
        }
        const isUserExist = await user.exists({ 'username': username });
        //console.log(isUserExist);
        if (isUserExist) {
            return res.status(300).json({
                'message': "Username already existed"
            }).end();
        }

        await user.create(
            { username, role },
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

//Raise Tickets

const raiseTicket = async (req, res) => {
    try {
        const isExist = await user.exists({ 'username': req.authUser, "role": "admin" });
        if (!isExist) {
            return res.status(400).json({ 'message': 'unauthorised access' }).end();
        }
        const { title, description } = req.body;
        const userData = await user.find();
        if(!userData){
            return res.status(200).json({
                'message':"No employees to assign task"
            })
        }
        const ind = Math.floor(Math.random()*userData.length);
        const assignedTo = userData[ind].username;

        const priority = ['low','high','medium'].at(Math.floor(Math.random()*3));
        const ticketdata = await new tickets({ title, description,assignedTo,priority});
        ticketdata.save();
        res.status(200).json({ 'message': ticketdata['_id'] }).end();
    }
    catch (err) {
        console.log(err);
    }
}

const getAllTickets = async (req, res) => {
    const ticketsData = await tickets.find();
    res.status(200).json({ 'count':ticketsData.length,'message': ticketsData })
}

const getTickets = async (req, res) => {
    try {
        const { status, title, priority } = req.query;
        if (status) {
            const data = await tickets.find({ 'status': status });
            res.status(200).json({ 'message': data }).end();
        }
        else if (title) {
            const data = await tickets.find({ 'title': title });
            res.status(200).json({ 'message': data }).end();
        }
        else if (priority) {
            const data = await tickets.find({ 'priority': priority });
            res.status(200).json({ 'message': data }).end();
        }
        else {
            console.log(status, title, priority);
            res.status(300).json({ 'message': "enter parameters" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'message': "Internal Error" }).end();
    }
}
const closeTicket = async (req, res) => {
    try {
        const data = await tickets.findById(req.body.ticketID);
        console.log(data);
        if(!data){
            return res.status(400).json({
                'message':'Invalid Ticket'
            }).end()
        }
        if (data['assignedTo'] === "") {
            return res.status(400).json({
                'message': 'tickets not assigned to you'
            });
        }
        var userData=undefined;

        if (data['assignedTo'] === req.authUser) {
            userData={'username':data['assignedTo']};
        }
        else {
            userData = await user.find({ 'username': data['assinedTo'], 'role': "admin" });
            console.log('userData',userData)
        }
        console.log(userData)
        if (userData && userData.username) {
            const tdata = await tickets.find({
                "assignedTo": userData['username'],
                "priority": "high",
                "status": "open"
            });
            if (tdata && tdata.length) {
                const isSame = tdata.some(t=>{
                    if(t._id.toString()===data._id.toString()){
                        return true;
                    }
                })
                if(!isSame)
                return res.status(300).json({
                    'error': '‘A higher priority task remains to be closed',
                    'tasksToBeClosed': tdata
                })
            }
            await tickets.findByIdAndUpdate(req.body.ticketID, { 'status': "closed" });
            res.status(200).json({
                "message": "Ticket Closed Successfully"
            })
        }
        else{
            res.status(300).json({
                'message':'Unauthorised access'
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).status({
            'message':'bad request'
        })
    }
}
const delTicket = async (req, res) => {
    try {
        console.log(req.body);
        const isAdmin = await user.find({'username':req.authUser,'role':"admin"});
        if(!isAdmin || isAdmin.length===0){
            return res.status(400).json({
                'message':"unauthorised access"
            }).end();
        }
        const data = await tickets.findByIdAndDelete(req.body.ticketID);
        if (data) {
            return  res.status(200).json({ 'message': 'Deleted Succesfully' }).end();
        }
        else throw Error('Invalid Ticket');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 'message': "Invalid ticket" });
    }
}

const notfound = async (req,res)=>{
    res.send(notfoundpage);
}


export { raiseTicket, delTicket, getTickets, getAllTickets, closeTicket, register, home,notfound };