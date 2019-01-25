import React, { Component } from 'react';
import api from './dataRequests';
import localForage from 'localforage';
import lodash from 'lodash';
import Header from './components/Header';
import WeatherTeaser from './components/WeatherTeaser';
import style from './ReactApp.css';
let moment = require('moment');

export default class ReactApp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            savedCities: [],
        };
        this.getCityWeather = this.getCityWeather.bind(this);

        this.initDB();

        localForage.iterate((value, key, iterationNumber) => {
            let currentCities = lodash.cloneDeep(this.state.savedCities);
            currentCities.push(value);
            this.setState({ savedCities: currentCities });
        }).then(function() {
            console.log('Iteration has completed');
        }).catch(function(err) {
            console.log(err);
        });
    }



    saveCity(cityAndWeatherData)
    {
        let savedCities = [];
        localForage.setItem(cityAndWeatherData.cityData.id.toString(), cityAndWeatherData).then(function () {
            console.log("item added to database")
        }).catch(function (err) {
            // we got an error
            console.log("db error");
        });
        if(this.state.savedCities.find(element => element.cityData.id === cityAndWeatherData.cityData.id) == undefined)
        {
            savedCities = lodash.cloneDeep(this.state.savedCities);            
            savedCities.unshift(cityAndWeatherData);            
            this.setState({ savedCities });
        }
        else
        {        
            return;
        }        
    }

    initDB()
    {
        localForage.config({
            driver      : localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
            name        : 'weatherAppForage',
            version     : 1.0,
            storeName   : 'dataStorage', // Should be alphanumeric, with underscores.
            description : 'some description'
        });
        console.log("Database init complete");
    }

    getCityWeather(cityData)
    {
        api.getCityWeather(cityData.id).then(weatherData => {
            const unixTimeNow = moment().unix();
            this.saveCity({
                cityData,
                weatherData,
                unixTimeNow
            });
        })
    }


    render() {        
        return (
            <div >
                <Header getCityWeather={this.getCityWeather}/>
                <div className={style.cardContainer}>
                    {
                        this.state.savedCities.map(city => {
                        return <WeatherTeaser key={city.cityData.id} data={city} />
                    })}  
                </div>                              
            </div>
        )
    }
}
