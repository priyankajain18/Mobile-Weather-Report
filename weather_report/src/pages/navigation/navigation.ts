import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { StationDetailPage } from '../station-detail/station-detail';
import { Temperature } from '../temperature/temperature';
import { Pressure } from '../pressure/pressure';
import { Wind } from '../wind/wind';
import { Humidity } from '../humidity/humidity';

const API_KEY: any = "7cd4e5f42da41d65c82e878037f45153";

@Component({
	selector: 'navigation',
	templateUrl: 'navigation.html'
})

export class NavigationPage {
	_db: any;
	station: any;

	stationDetail: any;
	temperature: any;
	pressure: any;
	wind: any;
	humidity: any;

	stationParams: any;

	weatherIcons: {[id: string]: String} = {
		"01d": "md-sunny",
		"01n": "md-cloud",
		"02d": "md-partly-sunny",
		"02n": "md-cloudy",
		"03d": "md-cloud",
		"03n": "md-cloud",
		"04d": "md-cloudy-night",
		"04n": "md-cloudy-night",
		"09d": "md-rainy",
		"09n": "md-rainy",
		"10d": "md-rainy",
		"10n": "md-rainy",
		"11d": "md-thunderstorm",
		"11n": "md-thunderstorm",
		"13d": "md-snow",
		"13n": "md-snow",
		"50d": "md-cloudy-night",
		"50n": "md-cloudy-night"
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
		this._db = navParams.data.db;
		this.station = navParams.data.station;

		this.stationDetail = StationDetailPage;
		this.temperature = Temperature;

		this.pressure = Pressure;
		this.wind = Wind;
		this.humidity = Humidity;
		this.stationParams = {
			db: this._db,
			station: this.station,
			stationDetailData: this.getStationDetailData(),
			stationForecastData: this.getStationForecastData(),
			weatherIcons: this.weatherIcons
		};
	}

	getStationDetailData() {
		return this.httpClient.get("http://api.openweathermap.org/data/2.5/weather?id="+this.station.s_id+"&APPID="+API_KEY)
	}

	getStationForecastData() {
		return this.httpClient.get("http://api.openweathermap.org/data/2.5/forecast?id="+this.station.s_id+"&APPID="+API_KEY)
	}
}
