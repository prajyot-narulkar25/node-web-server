const express =  require('express');
const hbs = require('hbs')
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000 ;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log +'\n' ,(err) =>{
        if(err){
            console.log("unable to connect to server")
        }
    })
    next();
 
});

app.get((res,req,next)  =>{
    res.render('maintainance.hbs',{
        pageTitle : "Maintainance Page",
        maintainanceMessage : "Website is under maintainance",
    });
});

app.use(express.static(__dirname+ '/public'));


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screenIt',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res) =>{
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name:'Andrew',
    //     Likes:["Biking","Cities"]
    // })
    res.render('home.hbs',{
        pageTitle : "Home Page",
        welcomeMessage : "Welcome to my website",
    });
});

app.get('/about',(req,res) =>{
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle : "About Page",
    });
});


app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    })
});



app.listen(port,()=>{
    console.log(`Server is ready on port ${port}`);
});