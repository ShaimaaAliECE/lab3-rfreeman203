const express = require('express');
const cookieParser = require('cookie-parser');
const newConnection = require('./DBConnection');

const app = express();

app.use(cookieParser("hidden"));

//serve static contents

app.use(express.static('static'));

//dynamic handling
app.use(express.urlencoded({
    extended: true
}))

app.get('/home/guest', function (req, res){
    let conn = newConnection();
    conn.connect();

    let meetingsList;
    conn.query(`SELECT * FROM Meeting`, (err,rows,fields) => {

        if(err)
            response.send('Error: ' + err)
        else
        {
            meetingsList = rows;
            //WELCOME GUEST
            c = '<h1> Hello guest! Todays available slots: </h1>';

            //ADD TABLE DISPLAYING MEETINGS    
            c += '<style> table, th, td {border:1px solid black;}</style>';
            c += '</br><table><tr>';
            c += '<th>Meeting Name</th><th>Location</th><th>Time</th>';
            c += '<th>Host Name</th><th>Host Email</th>';
            c += '</tr>';
            for(m of meetingsList)
            {
                c += '<tr>';
                c += '<td>' + m.Title + '</td>';
                c += '<td>' + m.Location + '</td>';
                c += '<td>' + m.Time + '</td>'
                c += '<td>' + m.Name + '</td>'
                c += '<td>' + m.Email + '</td>'
                c += '<td><form action =\'/joinMeeting\'>'
                c += '<input type="submit" value="join">'
                c += '</form></td>'
                c += '</tr>' + '\n';
            }
            c += '</table>';

            //SEND CONTENT OF TABLE
            res.send(c);

        }
    });

    conn.end();
})

app.post('/home/member', function (req, res){
    
    let userName = req.body.name || '';
    let password = req.body.pwd;
    res.cookie("usr",userName);
    res.cookie("pwd",password, {signed:true});

    let conn = newConnection();
    conn.connect();

    let meetingsList;
    conn.query(`SELECT * FROM Meeting`, (err,rows,fields) => {

        if(err)
            response.send('Error: ' + err)
        else
        {
            meetingsList = rows;
            //WELCOME USER
            c = '<h1> Hello ' + userName + '! Todays available slots: </h1>';

            //ADD NEW MEETING
            c += '<a href=\'/addMeeting.html\'>Click here to add new meeting</a></br>'

            //ADD TABLE DISPLAYING MEETINGS    
            c += '<style> table, th, td {border:1px solid black;}</style>';
            c += '</br><table><tr>';
            c += '<th>Meeting Name</th><th>Location</th><th>Time</th>';
            c += '<th>Host Name</th><th>Host Email</th>';
            c += '</tr>';
            for(m of meetingsList)
            {
                c += '<tr>';
                c += '<td>' + m.Title + '</td>';
                c += '<td>' + m.Location + '</td>';
                c += '<td>' + m.Time + '</td>'
                c += '<td>' + m.Name + '</td>'
                c += '<td>' + m.Email + '</td>'
                c += '<td><form action =\'/deleteMeeting\'>'
                c += '<input type="submit" value="delete">'
                c += '</form></td>'
                c += '</tr>' + '\n';
            }
            c += '</table>';

            //SEND CONTENT OF TABLE
            res.send(c);

        }
    });


    conn.end();
})

app.get('/joinMeeting',function (req, res){
    let conn = newConnection();
    conn.connect();
    res.send("Test");
    conn.end();
})



app.get('/deleteMeeting',function (req, res){

    let conn = newConnection();
    conn.connect();

    
    conn.query(`DELETE FROM Meeting WHERE Title = '${req.body.name}'`
        ,(err,rows,fields) => {
            if(err)
                res.send('Error: ' + err);
            else
                res.redirect('/');        
        } );
    
    conn.end();
})

//ADD MEETING PAGE
app.get('/addMeeting', function (req, res){
    
    let conn = newConnection();
    conn.connect();
    conn.query(`INSERT INTO Meeting VALUES ('${req.query.tit}','${req.query.loc}','${req.query.tim}','${req.query.nam}','${req.query.ema}')`
            ,(err,rows,fields) => {
                if(err)
                    res.send('Error: ' + err);
                else
                    res.redirect('/');        
            } );

    conn.end();
})



app.listen(80);
