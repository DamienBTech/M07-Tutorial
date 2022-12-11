const express = require('express');
const morgan = require('morgan');

//app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests

app.listen(3000);

//middleware and static
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('host: ', req.path);
    console.log('host: ', req.method);
    next();
});


app.get('/', (req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'More placeholder text'},
        {title: 'Mario finds stars', snippet: 'More placeholder text'},
        {title: 'How to defeat Bowser', snippet: 'More placeholder text'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.render('about', { title: 'About'})
});


app.get('/blogs/create', (req, res)=>{
    res.render('create', { title: 'Create a new Blog'})
})

//404 (LAST)
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});