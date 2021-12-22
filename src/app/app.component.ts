import { ResetPasswordDialog } from './resetpassword/resetpassword.template';

import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { NewServicesDialog } from './components/page/newServices/newServices.templete';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UtilsService
  ]
})
export class AppComponent implements OnInit {

  percentageUsedInGb: number;
  usedsizeGb: any;
  remainingStorageIngb: any;
  totalStorageInGb: any;
  serviceId: any;
  showDay: string;
  msgClass: string;
  barStyle: string;
  percentage: any;
  service1 = false;
  service2 = false;
  remainingDays: any;
  // newservices: any;
  resetDialog: any;
  reset = 'reset';
  current: number;
  balance: number;
  daysLeft: number;
  days: any;
  planId: any;
  id: any;
  userName: any;
  clientCode: any;
  maximumUsers: any;
  maximumPlaygrounds: any;
  validDays: any;
  planName: any;
  expiryDate: any;
  licencedDate: any;
  commonDetails: any;
  authToken: any;
  loggedInstatus: boolean;
  mydate = new Date();
  maximumPlaygroundUsers: any;
  maximumBuildingUsers: any;
  maximumBuildings: any;
  maximumIcearenaUsers: any;
  maximumIcearenas: any;
  maximumSportsfieldUsers: any;
  maximumSportsfield: any;
  maximumFiresafetyUsers: any;
  maximumFiresafety: any;
  maximumParkinglotUsers: any;
  maximumParkinglots: any;
  buildingStatus: any;
  buildingSta: string;
  icearenaStatus: string;
  sportsfieldStatus: string;
  fireStatus: string;
  parkingLots: string;
  href: string;
  slicedurl: string;
  constructor(
    private _utils: UtilsService,
    private _router: Router,
    public _mdDialog: MatDialog,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) { }

  ngOnInit() {
    const obj = this._router.config;

console.log(obj);

    this.href = window.location.href; console.log(window.location.href);
    this.slicedurl = window.location.href.substring(0, window.location.href.indexOf('#'));
    console.log(window.location.href.substring(0, window.location.href.lastIndexOf('#')));
    const currenturl = this._router.url
    const lastIndex = this.href.lastIndexOf('#');
    const redirectto = this.href.substr(lastIndex + 1);
    
    if(this.slicedurl == 'https://www.parkzapp.com/parkzappv2.4/')
    {
      this._utils.setAuthtoken(false);
      this._utils.createServiceId("");
      window.open("https://www.parkzapp.com/parkzappv2.5/#/login","_self")
      this.loggedInstatus = false;
    }
    this.loggedInstatus = this._utils.fetchAuthtoken();
    if (this.loggedInstatus) {
      this.fetchCommonTask();
    }
    this.serviceId = this._utils.fetchServiceId();
    //this._router.navigateByUrl('/home');
    
  }

  /**LOGOUT */
  logout() {
    this._utils.setAuthtoken(false);
    this._utils.createServiceId("");
    this._router.navigateByUrl('/login');
    this.loggedInstatus = false;
    // if (confirm('Are you sure to logout?')) {
    //   this._utils.setAuthtoken(false);
    //   this._router.navigateByUrl('/login');
    //   this.loggedInstatus = false;
    // }
  }

  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.commonDetails = response.data[0];
        this.licencedDate = response.data[0].licencedDate;
        this.expiryDate = response.data[0].expiryDate;
        this.planName = response.data[0].planName;
        this.validDays = response.data[0].validDays;
        this.maximumPlaygroundUsers = response.data[0].maximumPlaygroundUsers;
        this.maximumBuildingUsers = response.data[0].maximumBuildingUsers;
        this.maximumPlaygrounds = response.data[0].maximumPlaygrounds;
        // this.buildingStatus = response.data[0].buildingStatus;

        this.maximumBuildings = response.data[0].maximumBuildings;
        if (this.maximumBuildings != null) {
          this.buildingStatus = 'true';
        }
        this.maximumIcearenaUsers = response.data[0].maximumIcearenaUsers;
        this.maximumIcearenas = response.data[0].maximumIcearenas;
        if (this.maximumIcearenas != null) {
          this.icearenaStatus = 'true';
        }
        this.maximumSportsfieldUsers = response.data[0].maximumSportsfieldUsers;
        this.maximumSportsfield = response.data[0].maximumSportsfield;
        if (this.maximumSportsfield != null) {
          this.sportsfieldStatus = 'true';
        }
        this.maximumFiresafetyUsers = response.data[0].maximumFiresafetyUsers;
        this.maximumFiresafety = response.data[0].maximumFiresafety;
        if (this.maximumFiresafety != null) {
          this.fireStatus = 'true';
        }
        this.maximumParkinglotUsers = response.data[0].maximumParkinglotUsers;
        this.maximumParkinglots = response.data[0].maximumParkinglots;
        if (this.maximumParkinglots != null) {
          this.parkingLots = 'true';
        }

        this.clientCode = response.data[0].clientCode;
        this.userName = response.data[0].userName;
        //this.reset = response.data[0].reset;
        this.id = response.data[0].id;
        this.planId = response.data[0].planId;
        this.totalStorageInGb = response.data[0].totalsizeGb;
        this.remainingStorageIngb = response.data[0].remainingsizeGb;
        this.usedsizeGb = response.data[0].usedsizeGb;
        this.percentageUsedInGb = (this.usedsizeGb) / (this.totalStorageInGb) * 100;
        console.log(this.percentageUsedInGb);


        this.current = response.data[0].current;
        this.balance = response.data[0].balance;
        this.days = response.data[0].days;
        this.remainingDays = (this.validDays - this.days);
        this.percentage = (this.validDays * 10) / 100;
        if (this.remainingDays <= this.percentage) {
          this.barStyle = 'progress-bar-danger';
          this.msgClass = 'daysLeftWarning';
        } else {
          this.barStyle = 'progress-bar-success';
          this.msgClass = 'daysLeft';
        }
        if (this.remainingDays < 2) {
          this.showDay = 'day';
        } else {
          this.showDay = 'days';
        }
        //console.log(this.validDays);
        //console.log(this.remainingDays);
        //console.log(this.percentage);
      });
  }


  /**CHECK SESSION STATUS AFTER LOGIN */
  checkSessionStatusAndRedirectAfterLogin() {
    if (this.loggedInstatus === false) {
      this._router.navigateByUrl('/login');
    }
  }

  /**FOR REGISTRATION AND LOGIN PAGE */
  checkSessionStatusAndRedirectBeforeLogin() {
    if (this.loggedInstatus === true) {
      this._router.navigateByUrl('/home');
    }
  }

  resettoogle(event) {
    if (event.target.id !== "reset") {
      if (this.reset === 'reset open') {
        this.reset = 'reset';
      }
    }
  }
  toogleme() {
    if (this.reset === 'reset open') {
      this.reset = 'reset';
    } else {
      this.reset = 'reset open';
    }
  }

  resetButton() {
    this.reset = 'reset';
    const _dialog = this._mdDialog.open(ResetPasswordDialog, { disableClose: true });
    console.log(_dialog);
  }

  newServiceButton() {
    const _dialog = this._mdDialog.open(NewServicesDialog, { disableClose: true });
    console.log(_dialog);
  }

}
