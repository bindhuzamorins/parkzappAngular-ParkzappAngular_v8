import { UtilsService } from './../../../utils.service';
import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeClass: string;
  nameClass: string;
  nameDescription: string;
  serviceId: any;

  constructor(
    private _appComponent: AppComponent,
    private _utils: UtilsService,

  ) {
    this.serviceId = this._utils.fetchServiceId();
    if (this.serviceId === '1') {
      document.getElementById('iconofser').className = 'fa fa-leaf fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "green")
      document.getElementById('inspectionname').innerHTML = "PLAYGROUND<br/> INSPECTIONS";
      document.getElementById('inspection').innerHTML = "PARKS";
      document.getElementById('iconservice').className = 'pe-7s-leaf';
    }
    if (this.serviceId === '2') {
      document.getElementById('iconofser').className = 'fa fa-flag-checkered fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "azure");
      document.getElementById('inspectionname').innerHTML = "ICE ARENA<br/> SAFETY INSPECTIONS";
      document.getElementById('inspection').innerHTML = "PARKS";
      document.getElementById('iconservice').className = 'pe-7s-leaf';
    }
    if (this.serviceId === '3') {
      document.getElementById('iconofser').className = 'fa fa-building-o fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "purple");
      document.getElementById('inspectionname').innerHTML = "Building <br/> INSPECTIONS";
      document.getElementById('inspection').innerHTML = "BUILDINGS";
      document.getElementById('iconservice').className = 'fa fa-building-o';
    }
    if (this.serviceId === '4') {
      document.getElementById('iconofser').className = 'fa fa-soccer-ball-o fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "orange");
      document.getElementById('inspectionname').innerHTML = "Sports Field<br/> SAFETY INSPECTIONS";
      document.getElementById('inspection').innerHTML = "PARKS";
      document.getElementById('iconservice').className = 'pe-7s-leaf';
    }
    if (this.serviceId === '5') {
      document.getElementById('iconofser').className = 'fa fa-fire fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "red");
      document.getElementById('inspectionname').innerHTML = "FIRE<br/> SAFETY INSPECTIONS";
      document.getElementById('inspection').innerHTML = "PARKS";
      document.getElementById('iconservice').className = 'pe-7s-leaf';
    }
    if (this.serviceId === '6') {
      document.getElementById('iconofser').className = 'fa fa-road fa-2x pull-left';
      document.getElementById('greenmenu').setAttribute("data-color", "yellow");
      document.getElementById('inspectionname').innerHTML = "Parking Lot/Side Walk<br/> SAFETY INSPECTIONS";
      document.getElementById('inspection').innerHTML = "PARKS";
      document.getElementById('iconservice').className = 'pe-7s-leaf';
    }
    this.changeColor();
  }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    console.log(this.serviceId);
    this.changeColor();
    this.serviceName();
    // console.log(this.serviceId);
  }

  // FUNCTION FOR CHANGING COLOR W R TO SERVICES
  changeColor() {
    this.serviceId = this._utils.fetchServiceId();

    // console.log('after skin change  '+this.serviceId);
    if (this.serviceId === '1') {
      this.homeClass = 'playHome';

    } else if (this.serviceId === '2') {
      this.homeClass = 'iceHome';

    } else if (this.serviceId === '3') {
      this.homeClass = 'building';

    } else if (this.serviceId === '4') {
      this.homeClass = 'sports';

    } else if (this.serviceId === '5') {
      this.homeClass = 'fire';

    } else if (this.serviceId === '6') {
      this.homeClass = 'parking';
    }
  }

  serviceName() {
    this.serviceId = this._utils.fetchServiceId();

    // console.log('after skin change  '+this.serviceId);
    if (this.serviceId === '1') {
      this.nameClass = 'Parks';
      this.nameDescription = 'View current parks or add a new park';
      document.getElementById('iconHome').className = 'pe-7s-leaf animated fadeInUp';
    } else if (this.serviceId === '2') {
      this.nameClass = 'Icearena';
      this.nameDescription = 'View current parks or add a new park';
      document.getElementById('iconHome').className = 'pe-7s-leaf animated fadeInUp';
    } else if (this.serviceId === '3') {
      this.nameClass = 'Buildings';
      this.nameDescription = 'View Buildings or add a new buildings';
      document.getElementById('iconHome').className = 'fa fa-building-o';
    } else if (this.serviceId === '4') {
      this.nameClass = 'Sports';
      this.nameDescription = 'View current parks or add a new park';
      document.getElementById('iconHome').className = 'pe-7s-leaf animated fadeInUp';
    } else if (this.serviceId === '5') {
      this.nameClass = 'Fire';
      this.nameDescription = 'View current parks or add a new park';
      document.getElementById('iconHome').className = 'pe-7s-leaf animated fadeInUp';
    } else if (this.serviceId === '6') {
      this.nameClass = 'Parking Lots';
      this.nameDescription = 'View current parks or add a new park';
      document.getElementById('iconHome').className = 'pe-7s-leaf animated fadeInUp';
    }
  }
}