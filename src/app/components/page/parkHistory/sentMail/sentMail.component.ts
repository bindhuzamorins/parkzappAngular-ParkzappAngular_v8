import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkHistoryService } from '../parkHistory.service';
import { InspectionReportService } from '../../inspectionReport/inspectionReport.service';

@Component({
  selector: 'app-sentMail',
  templateUrl: './sentMail.component.html',
  styleUrls: ['./sentMail.component.css'],
  providers: [
    UtilsService,
    ParkHistoryService,
    InspectionReportService
  ]
})
export class SentMailParkHistoryDialog implements OnInit {
  email: any;
  authToken: any;
  btnLabel = 'Send';
  btnStatus = true;
  moreDetails: any;
  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _sentMailDialog: MatDialogRef<SentMailParkHistoryDialog>,
    private _parkHistoryService: ParkHistoryService,
    private _inspectionReportService: InspectionReportService
  ) { }

  ngOnInit() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
  }

  /** SENDING MAIL */
  send() {
    this.btnStatus = false;
    this.btnLabel = 'Sending! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('email', this.email);
    input.append('id', this.moreDetails.id);
    input.append('inspectionType', this.moreDetails.inspectionTypeId);
    input.append('inspectedDate', this.moreDetails.inspectedDate);
    input.append('parkId', this.moreDetails.parkId);

    // console.log('token ' + this.authToken);
    // console.log('email  ' + this.email);
    // console.log('assignmentid   ' + this.moreDetails.id);
    // console.log('type  ' + this.moreDetails.inspectionType);
    // console.log('inspected date  ' + this.moreDetails.inspectedDate);
    // console.log('id   ' + this.moreDetails.parkId);
    // alert();

    this._parkHistoryService.send(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          console.log(response);
          console.log("neeshma");
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          this._sentMailDialog.close();
        }
        else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          this._sentMailDialog.close();
          this.btnStatus = true;
        }
      });
  }


  close() {
    this._sentMailDialog.close();
  }
}
