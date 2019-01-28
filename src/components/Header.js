import React, { Component } from 'react';
import style from './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cityData = require('../data/current.city.list.json');
import AutoComplete from './AutoComplete';

class Header extends Component {

    render () {
        return (
            <div className={ style.header }>
                <div className={style.columnRow}>
                    <div>
                        PWA Weather
                    </div>
                    <div onClick={() => console.log("Not implemented yet")}>
                        <FontAwesomeIcon icon={faPlus} />                    
                    </div>
                </div>
                <div>
                    <AutoComplete options={cityData} onSelect={(selectedCityData) => this.props.getCityWeather(selectedCityData)} />
                </div>
            </div>
        )
    }
}

export default Header