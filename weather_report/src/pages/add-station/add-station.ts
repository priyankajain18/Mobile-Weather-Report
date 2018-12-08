import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavParams, NavController } from 'ionic-angular';

import { SearchStationPage } from '../search-station/search-station';

import * as $ from 'jquery';

const API_KEY: any = "7cd4e5f42da41d65c82e878037f45153";

@Component({
	selector: 'add-station',
	templateUrl: 'add-station.html'
})

export class AddStationPage {
	_db: any;
	stationInput: String = "";
	stations: Array<any> = [];
	selectedStations: Array<any> = [];
	visibility: string = "hidden";

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
	}

	searchStation() {
		if (this.stationInput.length > 0) {
			var self = $(this);

			$.ajax({
				method: "GET",
				url: "http://api.openweathermap.org/data/2.5/find?q="+this.stationInput+"&type=like&appid="+API_KEY
			})
			.done(function(response) {
				self[0].stations = response.list;
			})
			.fail(function(response) {
				self[0].stations = [];
			})
		}
		else {
			this.stations = [];
		}
	}

	selectStation(event, station) {
		if (event.checked) {
			this.selectedStations.push(station);
		}
		else {
			for (var index=0; index<this.selectedStations.length; index++) {
				if (station.id === this.selectedStations[index].id) {
					this.selectedStations.splice(index, 1);
				}
			}
		}

		if (this.selectedStations.length > 0) {
			this.showFooter = true;
		}
		else {
			this.showFooter = false;
		}
	}

	addStation = function() {
		if (this.selectedStations.length > 0) {
			var self = $(this);
			this._db.transaction((tx: any) => {
				self[0].selectedStations.forEach(station => {
					tx.executeSql("INSERT INTO stations (s_id, s_name, country, s_icon) VALUES (?, ?, ?, ?)", [station["id"], station["name"], station["sys"]["country"], station["weather"][0]["icon"]])
				});
			});

			this.navCtrl.push(SearchStationPage, {
				db: this._db
			});
		}
	}

	dropStation = function() {
		this._db.transaction((tx: any) => {
			console.log("Drop Table Stations");
			tx.executeSql("DROP TABLE stations");
		});

		this.navCtrl.push(SearchStationPage, {
			db: this._db
		});
	}
}