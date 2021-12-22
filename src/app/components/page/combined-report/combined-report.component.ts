import { Component, OnInit } from '@angular/core';
import { ParksService } from '../parks/parks.service';
import { UtilsService } from 'app/utils.service';
import { AppComponent } from 'app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { viewClassName } from '@angular/compiler';
import { ViewParkReportDialog } from '../parkHistory/viewReport/viewReport.template';
import { ViewCombinedReportComponent } from './view-combined-report/view-combined-report.component';
import { InspectionReportService } from '../inspectionReport/inspectionReport.service';

@Component({
  selector: 'app-combined-report',
  templateUrl: './combined-report.component.html',
  styleUrls: ['./combined-report.component.css'],
  providers: [
    UtilsService,
    ParksService,
    // QuestionService,
    InspectionReportService,
    // AssessmentReportService
  ]
})
export class CombinedReportComponent implements OnInit {
  imageUrl: string;
  serviceId: any;
  parks: any;
  parkName: any;
  authToken: any;
  btnStatus = true;
  btnLabel = 'Search Report';
  // minDate: Date;
  // maxDate: Date;
  allmaxDate = new Date();
  minDate = new Date('1-1-2000');
  maxDate = new Date();
  parkData: any;
  reportData: any;
  assesmentReport: any;
  fromDate: string;
  datetwo: any;
  toDate: string;
  inspectionName: string;
  insType: string;
  serviceThree: boolean;
  ;
  dateone: any;
  searchDate: string;
  // _inspectionReportService: any;
  dataFetchStatus: boolean;
  formStatus: boolean;
  inspectionReports: any;
  loadStatus: boolean;
  items: any[];
  messageStatus: boolean;
  inspectionReportData: any;
  type: any;
  input: any;

  // this.btnLabel = 'Search Inspection Report';


  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _parkService: ParksService,
    // private _questionService: QuestionService,
    private _inspectionReportService: InspectionReportService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    // public _AssessmentReportService: AssessmentReportService

  ) {

    this.imageUrl = this._utils.imageUrl;
  }


  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchParks();
    //   this.fetchInspectionTypes();
    //   this.fetchCommonTask();
    this.serviceReport();
    // }
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

  choosemindate() {
    this.minDate = new Date(this.dateone);
    console.log(this.minDate);
  }

  choosemaxdate() {
    this.maxDate = new Date(this.datetwo);
    console.log(this.maxDate);
  }

  search() {
    // if (this.inspectionType == 99) {
    //   this.searchass(data);
    //   this.ch_on = true;

    // } else {
    // this.ch_on = false;
    this.btnStatus = false;
    // this.loadStatus = true;
    this.btnLabel = 'Searching! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    const year = this.dateone.getFullYear();
    const month = this.dateone.getMonth() + 1;
    const day = this.dateone.getDate();
    this.fromDate = year + "-" + month + "-" + day;


    const year2 = this.datetwo.getFullYear();
    const month2 = this.datetwo.getMonth() + 1;
    const day2 = this.datetwo.getDate();
    this.toDate = year2 + "-" + month2 + "-" + day2;

    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('parkId', this.parkName);
    // input.append('inspectionType', this.inspectionType);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);
    // console.log(this.authToken);
    // this.fetchAssesmentReport();

    this._inspectionReportService.searchCombinedReport(input)
      .subscribe(response => {
        // console.log(response.data);
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.formStatus = true;

          this.inspectionReports = response.data;
          this.inspectionReportData = response.data1;
          this.assesmentReport = response.assesmentReport;
          console.log(this.inspectionReportData);
          const count = this.inspectionReportData.length;
          this.type = this.inspectionReportData.inspectionType;


          this.loadStatus = false;
          const len = this.inspectionReports.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspector: response.data[i].inspector
            });
          }
          // console.log(response.data);
          this.viewMore(this.inspectionReports);
          this.btnStatus = true;
          this.btnLabel = "Search Report";
        } else {
          this._snackBar.open(response.message, 'OKAY', {
            duration: 5000
          });
          this.dataFetchStatus = false;
          this.loadStatus = false;
          this.formStatus = true;
          this.messageStatus = true;
          this.btnStatus = true;
          this.btnLabel = "Search Report";

        }

      });

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

  /** VIEW MORE DETAILS OF INSPECTION REPORT  */
  viewMore(value: any) {
    const dialog = this._mdDialog.open(ViewCombinedReportComponent, { disableClose: true });
    dialog.componentInstance.inspectionReport = value;
    dialog.componentInstance.reportData = this.inspectionReportData;

    dialog.componentInstance.assesmentReportData = this.assesmentReport;
    // dialog.componentInstance.assesmentParkData = this.parkData;

    dialog.componentInstance.fromDate = this.fromDate;
    dialog.componentInstance.toDate = this.toDate;
    dialog.componentInstance.parkId = this.parkName;
    dialog.componentInstance.serviceId = this.serviceId;
    console.log("Value");
    console.log(dialog.componentInstance.fromDate);
    console.log(dialog.componentInstance.parkId);
    // console.log(dialog.componentInstance.inspectionReport);
    dialog.afterClosed().subscribe(result => {
    });
  }


}






