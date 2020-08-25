const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../../weather-app/utils/forecast');
const geocode = require('../../weather-app/utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// make public folder available to be consumed
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Home Page',
        name: 'Mert'
    });
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Mert'
    });
})

app.get('/help', (req, res) =>{
    res.render('help',{
        message : 'Do you need help?',
        name: 'Mert',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) =>{
    console.log(req.query)
    if(req.query.address){

        geocode.geocode(req.query.address, (error, {longitude,
                                                    latitude,
                                                    location} = {})=>
            {
                if(error){
                    return  res.send({
                        error: error + 'provide valid location'
                    })
                }

                forecast.forecast(latitude,longitude, (error, {temperature,
                                                                feelslike} = {})=>
                {
                    if(error){
                        return  res.send({
                            error: error + 'provide valid location'
                        })
                    }
                    res.send({
                        temperature,
                        feelslike,
                        location: location, 
                        address: req.query.address
                    })
                })
            }
        )
    }
    else{
        res.send({
            error : "Provide address"
        })
    }

    
})

app.get('/products', (req,res)=>{
    // console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'Provide search term'
        })
    }

    res.send({
        products : []
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        title: '404',
        name: 'Mert',
        error: 'Help aricle not found'
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        title: '404',
        name: 'Mert',
        error: 'Page not found'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>weather</h1>');
// })

// app.get('/help',(req, res)=>{
//     res.send([{
//         name: 'mert',
//         age: 26
//     },{
//         name: 'sıla',
//         age: 28
//     }]);
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>about page</h1>');
// })



app.listen(3000, () =>{
    console.log('Server is up on port 3000');
})