const request  = require('postman-request');
const path = require('path');

const geocode = require('./utils/geocode');

const weather = require('./utils/weather')

const express = require('express');

const app = express()

const hbs = require('hbs')

const port = process.env.PORT||5000;

// console.log(port)


//Define Path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partial')

//SetUp handelBars engine and views location
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
app.set('views',viewPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather-App',
        name: 'Kushagra'
    })
})





// app.get('', (req, res) => {
//     // res.send('<h1>Weather</h1>')
// })


// app.get('/help', (req, res) => {
    
//     res.send(publicDirectoryPath)
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title: 'Help',
        name: 'Kushagra'
    })
})







// app.get('/about', (req, res) => {
//     res.send('About page')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About-Page',
        name: 'Kushagra'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide Address'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error) return res.send({error});

        weather(data,(err,forcastData)=>{
            if(err) return res.send({error});

            res.send({
                forcast: forcastData,
                location: data.location,
                address: req.query.address
            })
        })
    });
    



    // res.send({
    //     forecast: 'Its snowing',
    //     location:'palwal',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{   //* work as if no above written route eill match
    res.render('404',{
        message: 'Help Article Not found',
        name: 'Kushagra'
    })
})
app.get('*',(req,res)=>{   //* work as if no above written route eill match
    res.render('404',{
        message:'404 Page Not Found',
        name: 'Kushagra'
    })
})


//app.com
// app.com/help




app.listen(port, () => {
    console.log(`Server is up on part ${port}.`)
})