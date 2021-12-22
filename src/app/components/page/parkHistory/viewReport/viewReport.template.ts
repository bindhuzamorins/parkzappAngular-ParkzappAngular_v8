import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ParkHistoryService } from 'app/components/page/parkHistory/parkHistory.service';

@Component({
  moduleId: module.id,
  templateUrl: './viewReport.template.html',


  styleUrls: ['./viewReport.template.css'],
  providers: [
    UtilsService,
    ParkHistoryService
  ]
})
export class ViewParkReportDialog implements OnInit {
  parkImage: any;
  parkName: any;
  mainHead: any;
  fieldsStatus: boolean;
  imageUrl: string;
  reports: any;
  authToken: any;
  moreDetails: any;
  btnStatus = true;
  //btnLabel = 'Add new city';
  constructor(
    public viewDialog: MatDialogRef<ViewParkReportDialog>,
    private _snackBar: MatSnackBar,
    private _ParkHistoryService: ParkHistoryService,
    private _utils: UtilsService

  ) {

  }

  ngOnInit() {
    this.viewMore();
    this.imageUrl = this._utils.imageUrl;
  }

  /** VIEW MORE DETAILS OF INSPECTION REPORT  */
    viewMore() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('parkId', this.moreDetails.parkId);
        input.append('inspectionType', this.moreDetails.inspectionTypeId);
        input.append('inspectedDate', this.moreDetails.inspectedDate);
        const serviceId = this._utils.fetchServiceId();
        input.append('serviceId', serviceId);
        console.log(this.moreDetails.id);
        this._ParkHistoryService.historyDetails(input)
            .subscribe(response => {
                // console.log(response);
                if (response.response_code === '1') {
                    this.reports = response.data;
                    this.mainHead = response.data[0];
                    this.parkName = this.mainHead.parkName;
                    this.parkImage = this.mainHead.parkImage;
                    this.fieldsStatus = true;
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });
    }
  /*CLOSE DIALOG*/
  close() {
    this.viewDialog.close();
  }
}