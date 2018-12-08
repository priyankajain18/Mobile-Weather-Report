import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchStationPage } from '../search-station/search-station';

import * as HighCharts from 'highcharts';
import * as _ from 'underscore';

@Component({
	selector: 'pressure',
	templateUrl: 'pressure.html'
})

export class Pressure {
	_db: any;
	station: any;
	stationDetailData: any = {};

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this._db = navParams.data.db;
		this.station = navParams.data.station;

		navParams.data.stationDetailData.subscribe(response => {
			this.stationDetailData = response;
		});

		navParams.data.stationForecastData.subscribe(response => {
			this.createPressureChart(response);
		});
	}

	createPressureChart(stationForecastData) {
		var pressureArray = _.map(stationForecastData.list, function(data) {
			return data.main.pressure;
		});
		var dateArray = _.map(stationForecastData.list, function(data) {
			return data.dt_txt;
		});

		HighCharts.chart('pressure-chart', {
			chart: {
				type: "line"
			},
			title: {
				text: ""
			},
			xAxis: {
				categories: dateArray,
				labels: {
					formatter: function() {
						return this.value.toString().substring(8, 10);
					}
				}
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: false
					},
					enableMouseTracking: true
				}
			},
			series: [{
				name: "Pressure",
				data: pressureArray
			}]
		})
	}

	goBack() {
		this.navCtrl.push(SearchStationPage, {
			db: this._db,
			station: this.station
		});
	}
}
