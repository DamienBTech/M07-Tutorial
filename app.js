const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const { result } = require('lodash');
const { render } = require('ejs');
//app
const app = express();

//connect to mongoDb
const dbURI = 'mongodb+srv://netninja:sVv9dX2Z9ZvW2NP@nodetutorial.dznvnls.mongodb.net/nodetutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');

//listen for requests

app.listen(3000);

//middleware and static
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

//routes
app.get('/', (req,res)=>{
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{
    //res.send('<p>About Page</p>');
    res.render('about', { title: 'About'})
});

//blog routes
app.use('/blogs', blogRoutes);

//404 (LAST)
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});