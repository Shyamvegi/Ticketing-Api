import express from "express"
import * as _ from '../controllers/handler.js';
import auth from "../middleware/auth.js";
const route = express.Router();

route.get('/',_.home);
route.post('/users/new',_.register);
route.post('/tickets/new',auth,_.raiseTicket);
route.get('/tickets/all',_.getAllTickets);
route.get('/tickets',_.getTickets);
route.post('/tickets/markAsClosed',auth,_.closeTicket);
route.post('/tickets/delete',auth,_.delTicket);
route.all('*',_.notfound);

export default route

