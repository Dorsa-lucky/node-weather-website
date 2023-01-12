// it exposes a single function, and we call it to create a new express application, and we call it only single time
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//to configure our server by using various methods provided on the application itself
const app = express()



//it's a way to customize our server

// Define paths for Express config
const publicDirectoryPath  = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //take a path where your partial lives


// Setup static directory to serve (here I'm defining the root folder for web server)
app.use(express.static(publicDirectoryPath))


//how to set up our server to send a response, when someone tries to get sth at a specific route
// app.get('', (req, res) => {
    //allows us to send back sth to requester (res.send is a handler)
//     res.send()
// })

//express is gonna detect that we have provided an object, it will stringify the json for us and it's gonna send it to requester correctly
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'dorsa',
//         age: 36
//     },{
//         name: 'dena',
//         age: 42
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About<h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dorsa Tayebipour'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dorsa Tayebipour'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dorsa Tayebipour'
        
    })
})


app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }  
    res.set('Access-Control-Allow-Origin', '*')
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {      //sends back products to be displayed in the browser
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dorsa Tayebipour',
        errorMessage: 'Help article not found. '
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dorsa Tayebipour',
        errorMessage: 'Page not found.'
    })
})

//app.com  it's one domain and it's gonna run on a single express server but we have different routs
//app.com/help
//app.com/about
//app.com/weather

//start the server up(common development port), with the web server is not gonna stop unless we stop it
app.listen(3000, () => {
    console.log('server is up on port 3500')
})