import React, { PureComponent } from 'react';
import styles from './WeatherTeaser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default class WeatherTeaser extends PureComponent {
    render() {
        return this.props.data == null ? null :
            (
                <div className={styles.main} onClick={this.props.onClick}>
                    <div className={styles.marginBox}>
                        <div className={styles.tempLabel}>{this.props.data.cityData.name}</div>
                        <div className={styles.tempValue}>{this.props.data.weatherData.main.temp}C</div>                    
                    </div>                    
                </div>
            );
    }
}
