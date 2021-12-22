import { Component, OnInit } from '@angular/core';
import { InspectionReportService } from './../inspectionReport.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewMap',
  templateUrl: './viewMap.component.html',
  styleUrls: ['./viewMap.component.css'],
  providers: [
    UtilsService,
    InspectionReportService,
  ]
})
export class ViewMapComponent implements OnInit {

  mapDetails: any;
  latitude: any;
  longitude: any;
  parkImage: any;
  parkName: any;
  mainHead: any;
  fieldsStatus = false;
  questionreportsSetDetails: any;
  imageUrl: string;
  queries: any;
  questionSetDetails: any;
  reports: any;
  parkId: any;
  inspectedDate: any;
  inspectionType: any;
  authToken: any;
  //latitudes: any;
  //longitudes: any;

  lat: any;
  lng: any;

  constructor(
    public _ViewMapComponent: MatDialogRef<ViewMapComponent>,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _inspectionReportService: InspectionReportService,
  ) { }

  ngOnInit() {
    this.viewMore();
    console.log('haii');
  }


  viewMore() {



    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', this.mapDetails.id);
    console.log(this.mapDetails.id);
    input.append('parkId', this.mapDetails.parkId);
    input.append('inspectionType', this.mapDetails.inspectionType);
    input.append('inspectedDate', this.mapDetails.inspectedDate);

    this._inspectionReportService.inspectionReportDetails(input)
      .subscribe(response => {
        console.log(response);

        if (response.response_code === '1') {
          this.reports = response.data;
          // console.log(this.reports);
          this.lat = parseFloat(response.data[0].questionSetAndQuestions[0].questions[0].latitude);
          this.lng = parseFloat(response.data[0].questionSetAndQuestions[0].questions[0].longitude_new);
          // this.mainHead = response.data[0];
          // this.parkName = this.mainHead.parkName;
          // this.parkImage = this.mainHead.parkImage;
          this.fieldsStatus = true;
        } else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
        }
      });
  }
  close() {
    this._ViewMapComponent.close();
  }

}
