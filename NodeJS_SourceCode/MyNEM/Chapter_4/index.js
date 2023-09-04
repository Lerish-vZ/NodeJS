const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'views/index.html'));
    res.render('index');
});

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'views/about.html'));
    res.render('about');
});

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'views/contact.html'));
    res.render('contact');
});

app.get('/post', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'views/post.html'));
    res.render('post');
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});