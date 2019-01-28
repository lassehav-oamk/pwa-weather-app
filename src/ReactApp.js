import React, { Component } from 'react';
import api from './dataRequests';
import localForage from 'localforage';
import lodash from 'lodash';
import Header from './components/Header';
import WeatherTeaser from './components/WeatherTeaser';
import style from './ReactApp.css';

export default class ReactApp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            savedCities: [],
        };
        this.getCityWeather = this.getCityWeather.bind(this);
        this.updateCityWeather = this.updateCityWeather.bind(this);

        this.initDB();

        /* Load items from database and populate the current state */
        localForage.iterate((cityDataFromDb, key, iterationNumber) => {
            let currentCities = lodash.cloneDeep(this.state.savedCities);
            currentCities.push(cityDataFromDb);
            this.setState({ savedCities: currentCities });
            this.updateCityWeather(cityDataFromDb);
        }).then(function() {
            console.log('DB initial load has completed');
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
            this.saveCity({
                cityData,
                weatherData                
            });
        })
    }

    updateCityWeather(cityAndWeatherData)
    {        
        api.getCityWeather(cityAndWeatherData.cityData.id).then(updatedWeatherData => {            
            let savedCities = [];
            let stateIndex = this.state.savedCities.findIndex(
                element => element.cityData.id === cityAndWeatherData.cityData.id
            );

            if (stateIndex != undefined) {
                /* clone the current elements, state should be immutable */
                savedCities = lodash.cloneDeep(this.state.savedCities);
                savedCities[stateIndex].weatherData = updatedWeatherData;

                /* Update data in the database */
                localForage.setItem(cityAndWeatherData.cityData.id.toString(), cityAndWeatherData).then(function () {
                    console.log(`${cityAndWeatherData.cityData.name} item update to database`);
                }).catch(function (err) {                    
                    console.log("db update error");
                });
                /* Update the state with the update data */
                this.setState({ savedCities });
            }                       
        })
    }


    render() {        
        return (
            <div >
                <Header getCityWeather={this.getCityWeather}/>
                <div>Click items to update</div>
                <div className={style.cardContainer}>
                    {
                        this.state.savedCities.map(city => {
                            return <WeatherTeaser key={city.cityData.id} data={city} update={this.updateCityWeather}/>
                    })}  
                </div>                              
            </div>
        )
    }
}
