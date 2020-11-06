// const { response } = require("express");

console.log('Client Side javascript is loaded');



const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript';

weatherForm.addEventListener('submit',(event)=>{
   event.preventDefault();  //Used For not refresh the window after pressing button 

   const location = search.value;

   messageOne.textContent = 'Loding...';
   messageTwo.textContent = '';
   
//    fetch(`http://localhost:4000/weather?address=${location}`).then((response)=>{
   fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error;
            // console.log(data.error);
        } else{
            messageOne.textContent = 'Location = ' + data.location
            messageTwo.textContent = 'Forcast = '  + 'It is mostly '+ JSON.stringify(data.forcast.weather_decreption)+' and temperature is about '
            + JSON.stringify(data.forcast.temperature)+ ' Degree Celcius & FellsLike Temperature is ' + JSON.stringify(data.forcast.feelsLikeTemp)+' Degree Celcius'
            // console.log(data.location);
            // console.log(data.forcast);
        }
    })
})

})