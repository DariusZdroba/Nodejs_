const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin ){
            callback(null, true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
//cross-origin-resource-sharing
app.use(cors(corsOption))

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));


app.get('^/$|/index(.html)?', (req, res) => {
   // res.sendFile('./views/index.html', { root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});
app.get('/new-page(.html)?', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));

});
app.get('/old-page(.html)?', (req, res) => {

    res.redirect(301, '/new-page.html')

});

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

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
