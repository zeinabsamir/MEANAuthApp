const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to the database '+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error'+err);
});
const app = express();

const users = require('./routes/users');

app.use(cors());

// create application/json parser
app.use(bodyParser.json());
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/users', users);

app.get('/', (req, res) =>{
    res.send('hello');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})