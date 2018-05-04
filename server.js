const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {     // This is a express Middleware
    let newDate = new Date().toString();
    let log = `${newDate}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log('Error in writing in the file');
    });
    next(); //THIS IS MOST IMPORTANT. WITHOUT next(); CALL THE APPLICATION WILL NOT MOVE AHEAD FOR EXECUTION AND IT'LL BE STUCK. 
            //SO NEVER MISS THIS CALL.
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello World!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Hi there! Welcome to this page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle req.'
    });
})
app.listen(3000);