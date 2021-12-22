import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/utils.service';

@Component({
  selector: 'app-general-reports',
  templateUrl: './general-reports.component.html',
  styleUrls: ['./general-reports.component.css']
})
export class GeneralReportsComponent implements OnInit {

  homeClass: string;
  serviceId: any;
  subTile: string;
  headTile: string;

  constructor(
    private _utils: UtilsService,
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    // console.log(this.serviceId);
    this.changeColor();
  }

  // FUNCTION FOR CHANGING COLOR W R TO SERVICES
  changeColor() {
    // console.log(this.serviceId);
    if (this.serviceId === '1') {
      this.homeClass = 'playHome';
      this.subTile = 'parks';
      this.headTile = 'Park History';

    } else if (this.serviceId === '2') {
      this.homeClass = 'iceHome';
      this.subTile = 'parks';
      this.headTile = 'Park History';


    } else if (this.serviceId === '3') {
      this.homeClass = 'building';
      this.subTile = 'buildings';
      this.headTile = 'Building History';


    } else if (this.serviceId === '4') {
      this.homeClass = 'sports';
      this.subTile = 'parks';
      this.headTile = 'Park History';


    } else if (this.serviceId === '5') {
      this.homeClass = 'fire';
      this.subTile = 'parks';
      this.headTile = 'Park History';


    } else if (this.serviceId === '6') {
      this.homeClass = 'parking';
      this.subTile = 'parks';
      this.headTile = 'Park History';


    }
  }

}
