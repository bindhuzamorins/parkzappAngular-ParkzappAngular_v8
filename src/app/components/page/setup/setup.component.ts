import { UtilsService } from './../../../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  subtextName: string;
  textName: string;
  homeClass: string;
  serviceId: any;

  constructor(
    private _utils: UtilsService,
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.changeColor();
    this.changeName();

  }

  // FUNCTION FOR CHANGING COLOR W R TO SERVICES
  changeColor() {
    // console.log(this.serviceId);
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

  // FUNCTION FOR CHANGING PARKS IN TO BUILDING
  changeName() {
    if (this.serviceId === '3') {
      this.textName = 'Buildings';
      this.subtextName = 'building';
    } else {
      this.textName = 'Parks';
      this.subtextName = 'park';
    }
  }


  // changeName() {
  //   if (this.serviceId === '3') {
  //     this.textName = 'Building';
  //     this.subtextName = 'building';
  //   } else if (this.serviceId === '2') {
  //     this.textName = 'Icearena';
  //     this.subtextName = 'icearena';
  //   }
  //   else if (this.serviceId === '4') {
  //     this.textName = 'Sportsfield';
  //     this.subtextName = 'sportsfield';
  //   }
  //   else if (this.serviceId === '5') {
  //     this.textName = 'FireandSafety';
  //     this.subtextName = 'fire';
  //   }
  //   else if (this.serviceId === '6') {
  //     this.textName = 'Parkinglot';
  //     this.subtextName = 'parkinglot';
  //   }
  //   else {
  //     this.textName = 'Park';
  //     this.subtextName = 'park';
  //   }

  // }
}