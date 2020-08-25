const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) 
    +'.json?access_token=pk.eyJ1IjoibWVydDEyMDk4IiwiYSI6ImNrZTdnejRxNTEybDMycXJ6bmFuc3N4MmYifQ.SEqMGOGlc1hIkV4SDG59tQ&limit=1';

    request({url, json: true}, (error, {body})=>{
        try{
            const latitude = body.features[0].center[0];
            const longitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            //console.log(latitude, longitude);
            callback(undefined,{
                latitude: latitude,
                longitude: longitude,
                location: location
            });
        }
        catch{
            //throw(new Error('Error: ', error));
            callback(new Error('Error inside callback: ', error),undefined);
        }  
    })
}

module.exports = {
    geocode
}