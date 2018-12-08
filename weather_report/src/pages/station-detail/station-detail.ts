import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchStationPage } from '../search-station/search-station';

@Component({
	selector: 'station-detail',
	templateUrl: 'station-detail.html'
})

export class StationDetailPage {
	_db: any;
	station: any;
	stationDetailData: any = {};
	weatherIcons: any = {};

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this._db = navParams.data.db;
		this.station = navParams.data.station;

		navParams.data.stationDetailData.subscribe(response => {
			this.stationDetailData = response;
		});

		this.weatherIcons = navParams.data.weatherIcons;
	}

	getStationSunriseSunset(data) {
		return new Date(data*1000);
	}

	getStationCloudiness(data) {
		var clouds = "";

		if(data) {
			for(var i=0; i<data.length; i++) {
				clouds = clouds.concat(data[i].main);
				if(i<data.length-1){
	                clouds = clouds.concat(", ");
	            }
			}
		}
		return clouds;
	}

	goBack() {
		this.navCtrl.push(SearchStationPage, {
			db: this._db,
			station: this.station
		});
	}
}
