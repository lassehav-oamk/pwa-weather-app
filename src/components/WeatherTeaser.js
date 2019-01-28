import React, { PureComponent } from 'react';
import styles from './WeatherTeaser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
let moment = require('moment');

export default class WeatherTeaser extends PureComponent {
    render() {

        const time = moment.unix(this.props.data.weatherData.dt).format('D.M.YYYY HH:mm:ss');

        return this.props.data == null ? null :
            (
                <div className={styles.main} onClick={() => { this.props.update(this.props.data) }}>
                    <div className={styles.marginBox}>
                        <div className={styles.tempLabel}>{this.props.data.cityData.name}, {this.props.data.cityData.country}</div>
                        <div className={styles.tempValue}>{this.props.data.weatherData.main.temp} &#8451;</div>
                        <div className={styles.tempTimeStamp}>{time}</div>
                    </div>                    
                </div>
            );
    }
}
