import React, { Component } from 'react'
import WeatherTeaser from './WeatherTeaser';

export default class MasterView extends Component {
    render() {
        return (
            <div>                 
                { this.props.savedCities.map(city => {
                    return <WeatherTeaser key={city.cityData.id} data={ city } onClick={() => this.props.detailView(city)}/>
                })}
            </div>
        )
    }
}
