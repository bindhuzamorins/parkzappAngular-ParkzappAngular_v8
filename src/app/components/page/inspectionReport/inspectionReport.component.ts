import { ViewMoreAssessmentDialog } from './../assessmentReport/viewReport/viewMore.template';
import { SentMailDialog } from './sentMail/mail.template';
import { ViewMoreDialog } from './viewMore/viewMore.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InspectionReportService } from './inspectionReport.service';
import { QuestionService } from './../questions/question.service';
import { ParksService } from './../parks/parks.service';
import { UtilsService } from './../../../utils.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../app.component';
import { AssessmentReportService } from '../assessmentReport/assessmentReport.service';
import { mailDialog } from '../assessmentReport/mail/mail.template';
import { ViewMapComponent } from './viewMap/viewMap.component';


@Component({
  selector: 'app-inspectionReport',
  templateUrl: './inspectionReport.component.html',
  styleUrls: ['./inspectionReport.component.css'],
  providers: [
    UtilsService,
    ParksService,
    QuestionService,
    InspectionReportService,
    AssessmentReportService
  ]

})

export class InspectionReportComponent implements OnInit {
  planId: any;
  serviceId: any;
  pdfUrl: string;
  imageUrl: string;
  clientCode: any;
  snackMessage: any;
  pdfPath: any;
  formStatus = false;
  items: any[];
  loadStatus = false;
  dataFetchStatus: boolean;
  inspectionReports: any;
  parkName: any;
  ch_on = false;
  inspectionType: any;
  fromDate: any;
  toDate: any;
  Park: any;
  inspectionTypes: any;
  authToken: any;
  parks: any;
  btnLabel = 'Search Inspection Report';
  btnStatus = true;
  filterArray: any = { inspector: '' };
  messageStatus = false;
  printlabel = 'Print';
  printStatus = true;
  allmaxDate = new Date();
  minDate = new Date('1-1-2000');
  maxDate = new Date();
  dateone: any;
  datetwo: any;
  inspectionName: string;
  serviceThree: boolean;
  insType: string;
  planprintStatus = false;

  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _parkService: ParksService,
    private _questionService: QuestionService,
    private _inspectionReportService: InspectionReportService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    public _AssessmentReportService: AssessmentReportService

  ) {

    this.imageUrl = this._utils.imageUrl;
  }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchParks();
    this.fetchInspectionTypes();
    this.fetchCommonTask();
    this.serviceReport();
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._parkService.fetchData(input)
      .subscribe(response => {
        this.parks = response.data[0].parks;
        // console.log(response.data);
      });
  }
  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.clientCode = response.data[0].clientCode;
        this.planId = response.data[0].planId;
        if (this.planId != '0') {
          this.planprintStatus = true;
        }
        else {
          this.planprintStatus = false;
        }
      });
  }

  /** FETCH INSPECTION TYPES */
  fetchInspectionTypes() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._questionService.fetchInspectionType(input)
      .subscribe(response => {
        // console.log(response.data);
        this.inspectionTypes = response.data;
      });
  }

  /**SHOW SEARCH FORM */
  showForm() {
    this.formStatus = false;
    this.messageStatus = false;
    this.btnStatus = true;
    this.loadStatus = false;
    this.btnLabel = 'Search Inspection Report';
  }

  /** SEARCH FOR INSPECTION REPORT */
  search(data: any) {
    if (this.inspectionType == 99) {
      this.searchass(data);
      this.ch_on = true;

    } else {
      this.ch_on = false;
      this.btnStatus = false;
      this.loadStatus = true;
      this.btnLabel = 'Searching! Please wait...';
      this.authToken = this._utils.fetchAuthtokenTokenString();
      const input = new FormData();

      const year = this.dateone.getFullYear();
      const month = this.dateone.getMonth() + 1;
      const day = this.dateone.getDate();
      this.fromDate = year + "-" + month + "-" + day;

      const year1 = this.datetwo.getFullYear();
      const month1 = this.datetwo.getMonth() + 1;
      const day1 = this.datetwo.getDate();
      this.toDate = year1 + "-" + month1 + "-" + day1;
      input.append('token', this.authToken);
      input.append('serviceId', this.serviceId);

      input.append('parkId', this.parkName);
      input.append('inspectionType', this.inspectionType);
      input.append('from', this.fromDate);
      input.append('to', this.toDate);

      // console.log(this.authToken);
      this._inspectionReportService.search(input)
        .subscribe(response => {
          // console.log(response.data);
          if (response.response_code === '1') {
            this.dataFetchStatus = true;
            this.formStatus = true;

            this.inspectionReports = response.data;
            console.log(this.inspectionReports);

            this.loadStatus = false;
            const len = this.inspectionReports.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                inspector: response.data[i].inspector
              });
            }
          } else {
            this._snackBar.open(response.message, 'OKAY', {
              duration: 5000
            });
            this.dataFetchStatus = false;
            this.loadStatus = false;
            this.formStatus = true;
            this.messageStatus = true;
          }

        });
    }

  }



  /** VIEW MORE DETAILS OF INSPECTION REPORT  */
  viewMore(value: any) {
    const dialog = this._mdDialog.open(ViewMoreDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }

  /** VIEW MAP OF INSPECTION REPORT  */
  viewMap(value: any) {
    const dialog = this._mdDialog.open(ViewMapComponent, { disableClose: true });
    dialog.componentInstance.mapDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }

  /** VIEW MORE DETAILS OF INSPECTION REPORT  */
  sentMail(value: any) {
    const dialog = this._mdDialog.open(SentMailDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }

  /** FUNCTION FOR BACK TO SEARCH FORM */
  goBack() {
    this.dataFetchStatus = false;
    this.formStatus = false;
    this.btnStatus = true;
    this.btnLabel = 'Search Inspection Report';
    this.parkName = '';
    this.inspectionType = '';
    this.fromDate = '';
    this.toDate = '';
  }

  /** CODE FOR PRINT INSPECTION REPORT */
  print(value: any, element) {
    element.textContent = 'Please Wait..';
    element.disabled = true;


    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', value.parkId);
    input.append('id', value.id);
    input.append('inspectionType', value.inspectionType);
    input.append('inspectedDate', value.inspectedDate);
    console.log(value.id);
    this._inspectionReportService.print(input)
      .subscribe(response => {
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
  choosemindate() {
    this.minDate = new Date(this.dateone);
    console.log(this.minDate);
  }

  choosemaxdate() {
    this.maxDate = new Date(this.datetwo);
    console.log(this.maxDate);
  }

  searchass(data: any) {
    //this.btnStatus = false;
    this.loadStatus = true;
    this.btnLabel = 'Searching! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    // console.log(this.parkName);console.log(this.fromDate);console.log(this.toDate);
    const input = new FormData();
    const year = this.dateone.getFullYear();
    const month = this.dateone.getMonth() + 1;
    const day = this.dateone.getDate();
    this.fromDate = year + "-" + month + "-" + day;

    const year1 = this.datetwo.getFullYear();
    const month1 = this.datetwo.getMonth() + 1;
    const day1 = this.datetwo.getDate();
    this.toDate = year1 + "-" + month1 + "-" + day1;

    input.append('token', this.authToken);
    input.append('parkId', this.parkName);
    input.append('from', this.fromDate);
    input.append('to', this.toDate);

    // console.log(this.authToken);
    this._AssessmentReportService.search(input)
      .subscribe(response => {
        // console.log(response.data);
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.formStatus = true;

          this.inspectionReports = response.data;
          // console.log(this.inspectionReports);
          this.loadStatus = false;
          const len = this.inspectionReports.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspector: response.data[i].inspector
            });
          }
        } else {
          this._snackBar.open(response.message, 'OKAY', {
            duration: 5000
          });
          this.dataFetchStatus = false;
          //this.loadStatus = false;
          this.formStatus = true;
          this.messageStatus = true;
        }

      });
  }


  sentemail(value: any) {
    // console.log(value);
    const dialog = this._mdDialog.open(mailDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }

  /* CODE FOR VIEW ASSESSMENT CHECKLIST REPORT */
  ViewReport(value: any) {
    const dialog = this._mdDialog.open(ViewMoreAssessmentDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.componentInstance.parkHistory = false;
    dialog.afterClosed().subscribe(result => {
    });
  }

  /** CODE FOR PRINT INSPECTION REPORT */
  printReport(value: any, element) {
    element.textContent = 'Please Wait..';
    element.disabled = true;

    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('assessmentId', value.assessmentId);
    // input.append('id', this.inspectionReports[0].id);
    // input.append('inspectionType', value.inspectionType);
    input.append('parkId', value.parkId);
    // console.log(this.inspectionReports[0].id);
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

  serviceReport() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1') {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';

    }

    if (this.serviceId === '2') {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '3') {
      this.serviceThree = true;
      this.inspectionName = 'Building Name';
      this.insType = 'Building';


    }

    if (this.serviceId === '4') {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '5') {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '6') {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';

    }

  }



}
