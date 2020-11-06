const request = require('postman-request');

const weather = (data,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=6c959e9a4375abb1da8a13e7578f053d&query=`+encodeURIComponent(data.longitude)+`,`+encodeURIComponent(data.latitude)+`&units=f`
// console.log(url);
request({ url,json: true }, (err,responce) =>{
    if(err){
        // console.log('Unable to connect to weather Services');
        callback('Unable to connect to weather Services',undefined);
    }else{
        if(responce.body.error){ // Invalid Latitude and longitude
        
            // console.log('Unable to find Location');
            callback('Unable to find Location',undefined);
        }
        else{
            
            callback(undefined,{
                weather_decreption: responce.body.current.weather_descriptions[0],
                temperature: responce.body.current.temperature,
                feelsLikeTemp: responce.body.current.feelslike
            })
            
            // console.log(`${responce.body.current.weather_descriptions[0]}. Temperature is = ${responce.body.current.temperature} and feels like temp is = ${responce.body.current.feelslike} `)
    
        }
    }
    
})

}
module.exports= weather;