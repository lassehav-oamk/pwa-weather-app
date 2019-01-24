import axios from 'axios';
const parameters = require('../parameters.json');

export default {
    getCityWeather: function(cityId)
    {
        return new Promise((resolve, reject) => {
           axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${parameters.openWeatherApiKey}&units=metric`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    resolve(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    reject(error);
                });     

        });
        
    }
}