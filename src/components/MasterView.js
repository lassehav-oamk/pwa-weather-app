import React, { Component } from 'react'
import api from '../dataRequests.js';
const cityData = require('../data/small.city.list.json');
import AutoComplete from './AutoComplete';
import WeatherTeaser from './WeatherTeaser';

export default class MasterView extends Component {
    render() {
        return (
            <div>
                <h1>PWA Weather App</h1>
                <div>
                    <AutoComplete options={cityData} onSelect={(selectedCityData) => this.props.apiGetCityWeather(selectedCityData)}/>
                </div>
                <div>
                    <WeatherTeaser data={ this.props.searchedCityData } onClick={() => this.props.detailView(this.props.searchedCityData)}/>
                </div>
                <h2>Favorite Cities</h2>
                { this.props.savedCities.map(city => {
                    return <WeatherTeaser key={city.cityData.id} data={ city } onClick={() => this.props.detailView(city)}/>
                })}
            </div>
        )
    }
}
