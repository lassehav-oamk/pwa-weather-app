import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

import style from './DetailView.css';

export default class DetailView extends Component {
    render() {
        return (
            <div>
                <div className={style.header}>
                    <div className={style.back} onClick={ this.props.onClickBack }>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </div>
                    <div className={style.favorite} onClick={() => this.props.toggleSavedStatus(this.props.data)}>
                        <FontAwesomeIcon icon={this.props.data.saved ? faStarSolid : faStarEmpty}/>
                    </div>
                </div>

                <div>
                    <h1>{ this.props.data.cityData.name}</h1>
                </div>
                <div className={style.row}>
                    <div className={style.rowColumn1}>Temperature</div>
                    <div>{this.props.data.weatherData.main.temp }</div>
                </div>
                <div className={style.row}>
                    <div className={style.rowColumn1}>Humidity</div>
                    <div>{this.props.data.weatherData.main.humidity }</div>
                </div>
                <div className={style.row}>
                    <div className={style.rowColumn1}>Pressure</div>
                    <div>{this.props.data.weatherData.main.pressure }</div>
                </div>
                <div className={style.row}>
                    <div className={style.rowColumn1}>Wind</div>
                    <div>{this.props.data.weatherData.wind.speed }m/s</div>
                </div>
            </div>
        )
    }
}
