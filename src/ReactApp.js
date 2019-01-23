import React, { Component } from 'react';
import api from './dataRequests';
import MasterView from './components/MasterView';
import DetailView from './components/DetailView';
import localForage from 'localforage';
import lodash from 'lodash';

export default class ReactApp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchedCityData: null,
            detailViewData: null,
            detailViewActive: false,
            savedCities: [],
        };
        this.updateSearchCityWeather = this.updateSearchCityWeather.bind(this);
        this.detailView = this.detailView.bind(this);

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

    updateSearchCityWeather(cityData)
    {
        api.getCityWeather(cityData.id).then(weatherData => {
            this.setState(
                {
                    searchedCityData:
                    {
                        cityData,
                        weatherData,
                        saved: false
                    }
                }
            );
        })
    }

    detailView(cityWeatherData)
    {
        this.setState({
            detailViewData: cityWeatherData,
            detailViewActive: true
        });
    }

    toggleSaveStatus(cityAndWeatherData)
    {
        if((this.state.searchedCityData != null) && (cityAndWeatherData.cityData.name === this.state.searchedCityData.cityData.name))
        {
            this.setState({ searchedCityData: null });
        }

        let savedCities = [];
        if(this.state.savedCities.find(element => element.cityData.id === cityAndWeatherData.cityData.id) == undefined)
        {
            savedCities = lodash.cloneDeep(this.state.savedCities);
            cityAndWeatherData.saved = true;
            savedCities.push(cityAndWeatherData);
            localForage.setItem(cityAndWeatherData.cityData.id, cityAndWeatherData).then(function () {
                console.log("item added to database")
              }).catch(function (err) {
                // we got an error
                console.log("db error");
              });
        }
        else
        {
            let detailViewData = lodash.cloneDeep(this.state.detailViewData);
            detailViewData.saved = false;

            this.state.savedCities.forEach(element => {
                if(element.cityData.id != cityAndWeatherData.cityData.id)
                {
                    savedCities.push(element);
                }
            });
            localForage.removeItem(cityAndWeatherData.cityData.id).then(function () {
                console.log("item removed from db");
            }).catch(function (err) {
                console.log("item remove error");
            });
            this.setState({ detailViewData });
        }
        this.setState({ savedCities });
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


    render() {
        let viewOutput = this.state.detailViewActive ?
            (
                <DetailView
                    data={this.state.detailViewData}
                    onClickBack={ () => this.setState({ detailViewActive: false })}
                    toggleSavedStatus={ (cityId) => this.toggleSaveStatus(cityId)}

                />
            ) :
            (
                <MasterView
                    apiGetCityWeather={ this.updateSearchCityWeather }
                    searchedCityData={ this.state.searchedCityData }
                    detailView={ this.detailView }
                    savedCities={ this.state.savedCities }
                />
            );

        return (
            <div>
                { viewOutput }
            </div>
        )
    }
}
