import { UtilsService } from './../../../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  homeClass: string;
  serviceId: any;

  constructor(
    private _utils: UtilsService,
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.changeColor();
  }

  // FUNCTION FOR CHANGING COLOR W R TO SERVICES
  changeColor() {
    console.log(this.serviceId);
    if (this.serviceId === '1') {
      this.homeClass = 'playHome';
    } else if (this.serviceId === '2') {
      this.homeClass = 'iceHome';
    } else if (this.serviceId === '3') {
      this.homeClass = 'building';
    }  else if (this.serviceId === '4') {
      this.homeClass = 'sports';
    } else if (this.serviceId === '5') {
      this.homeClass = 'fire';
    } else if (this.serviceId === '6') {
      this.homeClass = 'parking';
    }
  }


}