import { InspectionReportService } from 'app/components/page/inspectionReport/inspectionReport.service';
import { ViewParkReportDialog } from './viewReport/viewReport.template';
import { UtilsService } from 'app/utils.service';
import { ParksService } from './../parks/parks.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from "app/app.component";
import { ParkHistoryService } from "app/components/page/parkHistory/parkHistory.service";
import { ViewMoreAssessmentDialog } from '../assessmentReport/viewReport/viewMore.template';
import { SentMailParkHistoryDialog } from './sentMail/sentMail.component';
import { AssessmentReportService } from '../assessmentReport/assessmentReport.service';

@Component({
  selector: 'app-parkHistory',
  templateUrl: './parkHistory.component.html',
  styleUrls: ['./parkHistory.component.css'],
  providers: [
    ParksService,
    UtilsService,
    ParkHistoryService,
    InspectionReportService,
    AssessmentReportService
  ]
})
export class ParkHistoryComponent implements OnInit {
  planId: any;
  assessmentId: string;
  serviceId: any;
  parkHistory: any;
  parkId: any;
  parkHistories: any;
  snackMessage: any;
  items: any[];
  dataFetchStatus: boolean;
  authToken: any;
  parks: any;
  messageStatus = false;
  planprintStatus = false;
  headText: string;
  serviceThree: boolean;
  insType: string;
  // _AssessmentReportService: any;
  //authToken = this._utils.fetchAuthtokenTokenString();

  constructor(
    private _snackBar: MatSnackBar,
    public _parksService: ParksService,
    public _ParkHistory: ParkHistoryService,
    public _mdDialog: MatDialog,
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _inspectionReportService: InspectionReportService,
    public _AssessmentReportService: AssessmentReportService
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    // console.log('console from park history'+this.serviceId);
    this.fetchParks();
    this.fetchCommonTask();
    this.serviceHistory();
  }


  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.planId = response.data[0].planId;
        if (this.planId != '0') {
          this.planprintStatus = true;

        }
        else {
          this.planprintStatus = false;
        }


      });
  }

  /*FETCH INSPECTION TYPES */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    console.log(this.authToken);
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._parksService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '0') {
          this.snackMessage = 'No parks created yet!';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        } else {
          this.parks = response.data[0].parks;
        }
      });
  }
  /* FETCH PARK HISTORY */
  searchParkhistory() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', this.parkId);
    input.append('serviceId', this.serviceId);
    this._ParkHistory.fetchParkHistory(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.messageStatus = false;
          this.parkHistories = response.data;
          // console.log(this.parkHistories);
          const len = this.parkHistories.length;
          /*this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              question: response.data[i].question,
           });
          }*/
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
          this.dataFetchStatus = false;
          this.messageStatus = true;
        }
      });
  }

  /** VIEW MORE DETAILS OF INSPECTION REPORT  */
  // viewMore(value: any) {
  //   if (value.type === 'assessment') {
  //     const dialog = this._mdDialog.open(ViewMoreAssessmentDialog, { disableClose: true });
  //     dialog.componentInstance.moreDetails = value;
  //     dialog.afterClosed().subscribe(result => {
  //     });
  //   } else {
  //     const dialog = this._mdDialog.open(ViewParkReportDialog, { disableClose: true });
  //     dialog.componentInstance.moreDetails = value;
  //     dialog.afterClosed().subscribe(result => {
  //     });
  //   }
  // }



  viewMore(value: any) {
    if (value.type === 'assessment') {
      this.assessmentId = '1';
      const dialog = this._mdDialog.open(ViewMoreAssessmentDialog, { disableClose: true });
      dialog.componentInstance.moreDetails = value;
      dialog.componentInstance.parkHistory = true;

      dialog.afterClosed().subscribe(result => {
      });
    } else {
      const dialog = this._mdDialog.open(ViewParkReportDialog, { disableClose: true });
      dialog.componentInstance.moreDetails = value;
      dialog.afterClosed().subscribe(result => {
      });
    }
  }

  /**DOWNLOAD PDF PARK HISTORY */
  downloadParkhistory(element) {
    element.textContent = 'Downloading...';
    element.disabled = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', this.parkId);
    input.append('serviceId', this.serviceId);
    this._ParkHistory.downloadParkhistory(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          //  var newWin = window.open(response.data, "_blank");
          let printContents, popupWin;
          printContents = response.data;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          // popupWin.document.write(
          // '<html><head><style></style>QR Code </head><body  onload="window.print()">' + innerContents + '</html>');
          popupWin.document.write(`
              <html>
                <head>
                  <title>Park History</title>
                  <style>
                  //........Customized style.......
                  </style>
                </head>
            <body onload="window.print();">${printContents}</body>
              </html>`
          );
          popupWin.document.close();
          element.innerHTML = 'Print';
          element.disabled = false;
        } else {
          element.innerHTML = 'Print';
          element.disabled = false;
        }
      });
  }

  serviceHistory() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1') {
      this.headText = 'Park History';
      this.insType = 'Select Park';
    }

    if (this.serviceId === '2') {
      this.headText = 'Park History';
      this.insType = 'Select Park';

    }

    if (this.serviceId === '3') {
      this.serviceThree = true;
      this.headText = 'Building History';
      this.insType = 'Select Building';

    }

    if (this.serviceId === '4') {
      this.headText = 'Park History';
      this.insType = 'Select Park';

    }

    if (this.serviceId === '5') {
      this.headText = 'Park History';
      this.insType = 'Select Park';

    }

    if (this.serviceId === '6') {
      this.headText = 'Park History';
      this.insType = 'Select Park';

    }

  }

  sentemail(value: any) {
    // console.log(value);
    const dialog = this._mdDialog.open(SentMailParkHistoryDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }


  /** CODE FOR PRINT INSPECTION REPORT */
  print(value: any, element) {

    element.textContent = 'Please Wait..';
    element.disabled = true;
    console.log('printvaluetype');
    console.log(value.type);
    console.log(value);


    if (value.type === 'assessment') {

      this.assessmentId = '1';

      this.authToken = this._utils.fetchAuthtokenTokenString();
      const input = new FormData();
      input.append('token', this.authToken);
      input.append('parkId', value.parkId);
      input.append('assessmentId', value.id);
      // input.append('assessmentId', this.assessmentId);

      // console.log();
      this._AssessmentReportService.print(input)

        .subscribe(response => {

          // console.log(response);
          if (response.response_code === '1') {
            let printContents, popupWin;
            printContents = response.data;
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();

            popupWin.document.write(`
          <html>
            <head>
              <title>Inspection Report</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();">${printContents}</body>
          </html>`
            );
            popupWin.document.close();
            //  console.log(response.data);
            //   this.pdfPath = response.data;
            //   window.open(this.pdfPath, '_blank');
            element.textContent = 'Print';
            element.disabled = false;

          } else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 2000
            });
            element.textContent = 'Print';
            element.disabled = false;
          }
        }, error => {

          console.log(error);
          this.snackMessage = 'Please try again..';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 2000
          });
          element.textContent = 'Print';
          element.disabled = false;
          // console.log(error);
        }
        );


    }
    else {
      // element.textContent = 'Please Wait..';
      // element.disabled = true;


      this.authToken = this._utils.fetchAuthtokenTokenString();
      const input = new FormData();
      input.append('token', this.authToken);
      input.append('parkId', value.parkId);
      input.append('id', value.id);
      input.append('inspectionType', value.inspectionTypeId);
      input.append('inspectedDate', value.inspectedDate);

      console.log(this.authToken);
      console.log(value.parkId);
      console.log(value.id);
      console.log(value.inspectionTypeId);
      console.log(value.inspectedDate);

      this._ParkHistory.print(input)


        // this._inspectionReportService.print(input)
        .subscribe(response => {
          console.log(print);

          if (response.response_code === '1') {
            let printContents, popupWin;
            printContents = response.data;
            popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
            popupWin.document.open();
            // popupWin.document.write(
            //   '<html><head><style></style></head><body  onload="window.print()">' + printContents + '</html>');
            popupWin.document.write(`
              <html>
                <head>
                  <title>Inspection Report</title>
                  <style>
                  //........Customized style.......
                  </style>
                </head>
            <body onload="window.print();">${printContents}</body>
              </html>`
            );
            popupWin.document.close();
            //  console.log(response.data);
            //   this.pdfPath = response.data;
            //   window.open(this.pdfPath, '_blank');
            element.textContent = 'Print';
            element.disabled = false;

          } else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 2000
            });
            element.textContent = 'Print';
            element.disabled = false;
          }
        }, error => {

          console.log(error);
          this.snackMessage = 'Please try again..';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 2000
          });
          element.textContent = 'Print';
          element.disabled = false;
          // console.log(error);
        }
        );
    }

  }
}
