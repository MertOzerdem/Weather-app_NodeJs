
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const loc = process.argv[2];

if(loc){
    geocode.geocode(loc, (error, {longitude, latitude, location }= {})=>{
        if(error){
            return console.log('Error from callback', error);
        }
        
        // console.log('Data', response);
    
        forecast.forecast(longitude, latitude, (error, Forecastresponse)=>{
            if(error){
                return console.log('err', error);
            }
            
            console.log(location);
            console.log('res', Forecastresponse);
        })
    })
}
else{
    console.log('please provide address');
}