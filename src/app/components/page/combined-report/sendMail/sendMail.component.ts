import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InspectionReportService } from '../../inspectionReport/inspectionReport.service';

@Component({
  selector: 'app-sendMail',
  templateUrl: './sendMail.component.html',
  styleUrls: ['./sendMail.component.css'],
  providers: [
    UtilsService,
    InspectionReportService
  ]
})
export class SendMailComponent implements OnInit {

  email: any;
  authToken: any;
  btnLabel = 'Send';
  btnStatus = true;
  moreDetails: any;
  parkId: any;
  serviceId: any;
  fromDate: string;
  toDate: string;

  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _sentMailDialog: MatDialogRef<SendMailComponent>,
    private _inspectionReportService: InspectionReportService

  ) {

  }
  ngOnInit() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
  }

  /** SENDING MAIL */
  send() {
    this.btnStatus = false;
    this.btnLabel = 'Sending! Please wait...';
    // this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('email', this.email);
    // input.append('id', this.moreDetails.id);
    // input.append('inspectionType', this.moreDetails.inspectionType);
    // input.append('inspectedDate', this.moreDetails.inspectedDate);
    input.append('parkId', this.parkId);
    input.append('serviceId', this.serviceId);
    // input.append('inspectionType', this.inspectionType);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);

    this._inspectionReportService.sendCombinedMail(input)
      .subscribe(response => {
        if (response.response_code === '1') {
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



  /** CLOSE MDDIALOG  */
  close() {
    this._sentMailDialog.close();
  }
}

