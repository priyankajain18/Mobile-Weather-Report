import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NavigationPage } from '../navigation/navigation';

import * as $ from 'jquery';

const API_KEY: any = "7cd4e5f42da41d65c82e878037f45153";

@Component({
	selector: 'search-station',
	templateUrl: 'search-station.html'
})

export class SearchStationPage {
	_db: any;
	stations: Array<any> = [];

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this._db = navParams.data.db;
		this.getStations();
	}

	getStations() {
		this._db.transaction((tx: any) => {
			var self = $(this);
			tx.executeSql("SELECT * FROM stations", [], function(transaction, result){
				if (result.rows.length > 0) {
					self[0].stations = result.rows;
				}
			});
		});
	}

	stationNavigation(station) {
		this.navCtrl.push(NavigationPage, {
			db: this._db,
			station: station
		});
	}
}