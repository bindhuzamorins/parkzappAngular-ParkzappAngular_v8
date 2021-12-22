import { mailDialog } from './mail/mail.template';
import { AssessmentReportService } from './assessmentReport.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './../../../app.component';
import { ParksService } from './../parks/parks.service';
import { UtilsService } from './../../../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessmentReport',
  templateUrl: './assessmentReport.component.html',
  styleUrls: ['./assessmentReport.component.css'],
  providers: [
    UtilsService,
    ParksService,
    AssessmentReportService
  ]

})
export class AssessmentReportComponent implements OnInit {
  pdfUrl: string;
  imageUrl: string;
  clientCode: any;
  messageStatus: boolean;
  btnStatus: boolean;
  dataFetchStatus: boolean;
  formStatus: boolean;
  items: any[];
  filterArray: any = { inspector: '' };
  inspectionReports: any;
  toDate: any;
  fromDate: any;
  parkName: any;
  loadStatus = false;
  parks: any;
  authToken: any;
  allmaxDate= new Date();
  minDate = new Date('1-1-2000');
  maxDate = new Date();
  dateone:  any;
  datetwo:  any;

  btnLabel = 'Search Assessment Checklist Report';


  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _parkService: ParksService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    public _AssessmentReportService: AssessmentReportService

  ) {
    this.imageUrl = this._utils.imageUrl;
  }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.fetchParks();
    this.fetchCommonTask();
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._parkService.fetchData(input)
      .subscribe(response => {
        this.parks = response.data[0].parks;
        // console.log(response.data);
      });
  }

  /** SEARCH FOR INSPECTION REPORT */
  search(data: any) {
    //this.btnStatus = false;
    this.loadStatus = true;
    this.btnLabel = 'Searching! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    // console.log(this.parkName);console.log(this.fromDate);console.log(this.toDate);
    const input = new FormData();
    const year  = this.dateone.getFullYear();
    const month = this.dateone.getMonth()+1;
    const day = this.dateone.getDate();
    this.fromDate = year+"-"+month+"-"+day;

    const year1  = this.datetwo.getFullYear();
    const month1 = this.datetwo.getMonth()+1;
    const day1 = this.datetwo.getDate();
    this.toDate = year1+"-"+month1+"-"+day1;

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
          //this.loadStatus = false;
          this.formStatus = true;
          this.messageStatus = true;
        }

      });
  }

  /**SHOW SEARCH FORM */
  showForm() {
    this.formStatus = false;
    this.messageStatus = false;
    this.btnStatus = true;
    this.dataFetchStatus = false;
    this.loadStatus = false;
    this.btnLabel = 'Search Inspection Report';
  }

  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.clientCode = response.data[0].clientCode;
      });
  }


  /* CODE FOR VIEW AND PRINT REPORT */
  /*ViewAndPrint(value: any) {
    this.btnLabel = 'Processing...';
    this.pdfUrl = this.imageUrl + this.clientCode + '/blueprint/' + value.assessmentId + 'Parkassessment_report.pdf';
    window.open(this.pdfUrl, '_blank');
  }*/

  sentMail(value: any) {
    const dialog = this._mdDialog.open(mailDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }
  choosemindate()
  {    
    this.minDate = new Date(this.dateone);
    console.log(this.minDate);
  }

  choosemaxdate()
  {
    this.maxDate = new Date(this.datetwo);
    console.log(this.maxDate);
  }

}
