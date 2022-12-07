const { response } = require('express');
const express = require('express');
//app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests

app.listen(3000);

app.get('/', (req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'More placeholder text'},
        {title: 'Mario finds stars', snippet: 'More placeholder text'},
        {title: 'How to defeat Bowser', snippet: 'More placeholder text'},
    ];
    res.render('index', { title: 'Home', blogs});
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