const homepage= `<!DOCTYPE html>

<head>
    <title>Tricketing Api</title>
    <style>
        body{
            color:white !important;
        }
        #content{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
        }
        a{
            color:white;
            font-weight:bold;
            text-decoration:none;
            margin:5px;
            padding 5px;
        }
    </style>
</head>

<body>
    <div style="background-color: black;
    border-radius: 5px;
    border:5px solid red">
        <div id="content">
            <h1>Ticketing Api</h1>
            <a href="https://ticketingapiv1.herokuapp.com/users/new">Register</a>
            <a href="https://ticketingapiv1.herokuapp.com/tickets/new">Raise Ticket</a>
            <a href="https://ticketingapiv1.herokuapp.com/tickets/all">Show Tickets</a>
            <a href="https://ticketingapiv1.herokuapp.com/tickets/delete">Delete Ticket</a>
            <a href="https://ticketingapiv1.herokuapp.com/ticket/makeAsClosed">Close Ticket</a>
            <a href="https://ticketingapiv1.herokuapp.com/tickets/?status=closed">Show Tickets Acc To Status,Priority,Title</a>
        </div>
    </div>
</body>


</html>`

const notfoundpage = `<!DOCTYPE html>

<head>
    <title>Tricketing Api</title>
    <style>
        body{
            color:white !important;
        }
        #content{
            display:flex;
            font-size:30px;
            flex-direction:column;
            align-items:center;
            justify-content:center;
        }
    </style>
</head>

<body>
    <div style="background-color: black;
    border-radius: 5px;
    border:5px solid red">
        <div id="content">
            <h1>Not Found!</h1>
        </div>
    </div>
</body>


</html>`

export {notfoundpage,homepage};