
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const employee_route = require('./routes/employee_route')
const admin_route = require('./routes/admin_route')

//Bodyparser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect through mongoDB through mongoose
mongoose.connect(db).then(() => console.log('MongoDB  connected')).catch(err => console.log(err));


//use routes
app.use('/employee_route',employee_route);
app.use('/admin_route',admin_route);


//for heroku
const port =  5000;

app.listen(port,() => console.log(`Server running on port ${port}`));