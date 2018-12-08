import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { IndexPage } from '../pages/index/index';
import { SearchStationPage } from '../pages/search-station/search-station';
import { AddStationPage } from '../pages/add-station/add-station';
import { NavigationPage } from '../pages/navigation/navigation';
import { StationDetailPage } from '../pages/station-detail/station-detail';
import { Temperature } from '../pages/temperature/temperature';
import { Pressure } from '../pages/pressure/pressure';
import { Wind } from '../pages/wind/wind';
import { Humidity } from '../pages/humidity/humidity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HttpClientModule } from '@angular/common/http';

import * as $ from 'jquery';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IndexPage,
    SearchStationPage,
    AddStationPage,
    NavigationPage,
    StationDetailPage,
    Temperature,
    Pressure,
    Wind,
    Humidity
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    IndexPage,
    SearchStationPage,
    AddStationPage,
    NavigationPage,
    StationDetailPage,
    Temperature,
    Pressure,
    Wind,
    Humidity
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
