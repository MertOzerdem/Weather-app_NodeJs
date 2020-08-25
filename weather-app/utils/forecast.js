const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a6983e96d668387f955ec662fb064870&query=' 
                + lat + ',' + long;
    request({url, json: true}, (error, {body})=>{
        try{
            // console.log('It is currently ', response.body.current.temperature,
            // 'degrees outside.\nFeels like ', response.body.current.feelslike);
            // console.log(response);
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }catch{
            callback('Error inside callback: '+ error, undefined);
        }
    })
}

module.exports = {
    forecast
}