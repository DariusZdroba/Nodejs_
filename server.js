require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const Post = require('./model/PostModel');
const Comment = require('./model/Comments')
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const PORT = process.env.PORT || 3500;

//Connect to mongoDB
connectDB();

//questionable


//custom middleware logger
app.use(logger);


//Handle options credentials check - before CORS!!
//and fetch cookies credentials requirement
app.use(credentials);

//cross-origin-resource-sharing
app.use(cors(corsOption))

app.use(express.urlencoded({extended: false}));

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/post', require('./routes/post'));
app.use('/uploads', require('./routes/file'));
app.use('/comments', require('./routes/postComment'))
app.use('/uploads', require('./routes/fileDelete'));
app.use('/comments', require('./routes/commDelete'));
app.get('/uploads', (req, res) =>{
    try{ Post.find({}).then(data =>{
        res.json(data)
    }).catch(err => res.status(408).json({err})) 
    }
    catch(err){
        res.json({err})
    }
})
app.get('/comments', (req, res) =>{
    try{ Comment.find({}).then(data =>{
        res.json(data)
    }).catch(err => res.status(408).json({err})) 
    }
    catch(err){
        res.json({err})
    }
})
app.use('/uploads', require('./routes/putFile'))
app.use('/post', require('./routes/getFile'));
app.use('/comments', require('./routes/putComment'))
app.use('/users', require('./routes/userPut'))

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));



app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({ error : "404 page not found"});
    }
    else {
        res.type('txt').send('404 not found');
    }

    
});

app.use(errorHandler);


mongoose.connection.once('open',() => {
    console.log('Conected to mongoDB');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    });
    

})
