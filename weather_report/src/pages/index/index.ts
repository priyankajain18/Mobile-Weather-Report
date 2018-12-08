import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { SearchStationPage } from '../search-station/search-station';
import { AddStationPage } from '../add-station/add-station';

import { SQLite } from '@ionic-native/sqlite';

const win: any = window;

@Component({
	selector: 'index',
	templateUrl: 'index.html'
})

export class IndexPage {
	private _db: any;

	constructor(public platform: Platform, public navCtrl: NavController, private sqlite: SQLite) {
		this.platform.ready().then(() => {
			this.createDB();
		}, (error) => {
			console.log("Error" + error);
		})
	}

	createDB() {
		if (this.platform.is("cordova") && win.sqlitePlugin) {
			this._db = win.sqlitePlugin.openDatabase({
               name: "weather_report",
               location: 2,
               createFromLocation: 0
            });
		}
		else {
			this._db = win.openDatabase("weather_report", "1.0", "WeatherReport", 5 * 1024 * 1024);
		}

		this.createTable();
	}

	createTable() {
		this._db.transaction((tx: any) => {
			tx.executeSql("CREATE TABLE IF NOT EXISTS stations (id INTEGER PRIMARY KEY AUTOINCREMENT, s_id INTEGER NOT NULL, s_name CHAR(50) NOT NULL, country CHAR(50) NOT NULL, s_icon CHAR(50) NOT NULL, CONSTRAINT s_id_unique UNIQUE (s_id))");
		});
	}

	searchStation() {
		this.navCtrl.push(SearchStationPage, {
			db: this._db
		});
	}

	addStation() {
		this.navCtrl.push(AddStationPage, {
			db: this._db
		});
	}
}