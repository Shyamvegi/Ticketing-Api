# Ticketing-Api

Demo : https://ticketingapiv1.herokuapp.com/

Tech Stack : Node.js Express.js MongoDB

Routes:

Home : /

## Create Users : https://ticketingapiv1.herokuapp.com/users/new
Params -- username, role
Method -- Post

## Raise Ticket : https://ticketingapiv1.herokuapp.com/tickets/new 
Params -- title, Description
Method : Post
Authentication Required

## Delete Ticket : https://ticketingapiv1.herokuapp.com/tickets/delete
Params -- ticketID
Method -- Post
Authentication Required

## Get All Tickets : /tickets/all
Method -- GET

## Get Tickets : https://ticketingapiv1.herokuapp.com/tickets/<params>
Params -- ?status=open/close
          ?priority=low/medium/high
          ?title
Method -- Get

## Close Ticket : https://ticketingapiv1.herokuapp.com/tickets/markAsClosed
Params -- ticketID
Method -- Post
Authentication Required

