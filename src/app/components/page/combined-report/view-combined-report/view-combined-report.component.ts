import { SendMailComponent } from './../sendMail/sendMail.component';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/utils.service';
import { InspectionReportService } from '../../inspectionReport/inspectionReport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddInspectionNoteComponent } from '../../inspectionNote/add-inspection-note/add-inspection-note.component';
import { ViewInspectionNoteComponent } from '../../inspectionNote/view-inspection-note/view-inspection-note.component';
import { CombinedReportComponent } from '../combined-report.component';
import { SentMailDialog } from '../../inspectionReport/sentMail/mail.template';

@Component({
  selector: 'app-view-combined-report',
  templateUrl: './view-combined-report.component.html',
  styleUrls: ['./view-combined-report.component.css'],
  // moduleId: module.id,
  providers: [
    UtilsService,
    InspectionReportService,
  ]
})
export class ViewCombinedReportComponent implements OnInit {
  inspectionReport: any;
  mainHead: any;
  parkDetails: any;
  parkName: any;
  parkImage: any;
  imageUrl: string;
  inspectionDetails: any;

  qstnDetails: any[] = [];
  inspectionDate: any;
  certificate: any;
  reportData: any;
  authToken: any;
  dateone: any;
  searchDate: string;
  dataFetchStatus: boolean;
  formStatus: boolean;
  inspectionReports: any;
  serviceId: string | Blob;
  inputData: any;
  parkId: any;
  assesmentReportData: any;
  assesmentParkData: any;
  assesmentReport: any;
  snackMessage: any;
  fromDate: string;
  toDate: string;
  inspectionName: string;
  insType: string;
  serviceThree: boolean;
  constructor(
    public _viewCombinedReportDialog: MatDialogRef<ViewCombinedReportComponent>,
    public _mdDialog: MatDialog,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _inspectionReportService: InspectionReportService,

  ) {
  }

  ngOnInit() {
    this.fetchData();
    this.serviceId = this._utils.fetchServiceId();
    this.serviceReport();
    this.imageUrl = this._utils.imageUrl;
  }
  fetchData() {
    // this.inspectionReport;

    console.log(this.inspectionReport);
    // const len=this.inspectionReport.parkDa
    this.parkDetails = this.inspectionReport;
    this.parkName = this.parkDetails.parkName;
    this.parkImage = this.parkDetails.parkImage;
    console.log(this.parkName);

    this.inspectionDetails = this.reportData;
    this.inspectionDate = this.reportData.inspectedDate;
    this.certificate = this.reportData.certificateNumber;
    this.qstnDetails = this.reportData.questionSetAndQuestions;


  }

  fetchReport() {
    console.log('fetchReport');
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('parkId', this.parkId);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);
    // console.log(this.authToken);
    this._inspectionReportService.searchCombinedReport(input)
      .subscribe(response => {
        // console.log(response.data);
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.formStatus = true;

          this.inspectionReport = response.data;
          this.inspectionDetails = response.data1;
          this.assesmentReportData = response.assesmentReport;
          console.log(this.assesmentReportData);

        } else {
          this._snackBar.open(response.message, 'OKAY', {
            duration: 5000
          });
          this.dataFetchStatus = false;
          // this.loadStatus = false;
          this.formStatus = true;
          // this.messageStatus = true;
        }

      });
  }
  addNote(value) {
    const checkListStatus = '0';
    const _dialog = this._mdDialog.open(AddInspectionNoteComponent, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.componentInstance.checkList = checkListStatus;
    _dialog.afterClosed().subscribe(result => {
      this.fetchReport();
    });
  }
  viewNote(value) {
    const checkListStatus = '0';
    const _dialog = this._mdDialog.open(ViewInspectionNoteComponent, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.componentInstance.checkList = checkListStatus;

    _dialog.afterClosed().subscribe(result => {
      // this.fetchData();
    });
  }

  addNoteCheckList(value) {

    const _dialog = this._mdDialog.open(AddInspectionNoteComponent, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.componentInstance.checkListStatus = true;
    _dialog.afterClosed().subscribe(result => {
      this.fetchReport();
    });
  }
  viewNoteCheckList(value) {
    const _dialog = this._mdDialog.open(ViewInspectionNoteComponent, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.componentInstance.checkListStatus = true;
    _dialog.afterClosed().subscribe(result => {
      // this.fetchData();
    });
  }

  goToLink(value) {
    console.log(value);
    window.open(this.imageUrl + value, "_blank");
  }
  // printCombinedReport(): void {
  //   // tslint:disable-next-line:one-variable-per-declaration
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-combined-report').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>PARKZAPP</title>
  //         <style></style>
  //       </head>
  //   <body onload="window.print();">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }


  printCombinedReport(value: any, element) {
    // element.textContent = 'Please Wait..';
    // element.disabled = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', this.parkId);
    input.append('serviceId', this.serviceId);
    // input.append('inspectionType', this.inspectionType);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);

    this._inspectionReportService.printCombinedReport(input)
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

  sentemail(value: any) {
    const dialog = this._mdDialog.open(SendMailComponent, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.componentInstance.fromDate = this.fromDate;
    dialog.componentInstance.toDate = this.toDate;
    // dialog.componentInstance.parkId = this.parkName;
    dialog.componentInstance.serviceId = this.serviceId;
    dialog.componentInstance.parkId = this.parkId;
    dialog.afterClosed().subscribe(result => {
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
  print(element) {
    element.textContent = 'Please Wait..';
    element.disabled = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('parkId', this.parkId);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);
    // input.append('inspectedDate', value.inspectedDate);

    this._inspectionReportService.printCombinedReport(input)
      .subscribe(response => {
        console.log(response);

        // console.log(response.responseText);
        if (response.response_code === '1') {
          let printContents, popupWin;
          printContents = response.data;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          popupWin.document.write(`
            <html>
              <head>
                <title>Combined Report</title>
                <style>
                //........Customized style.......
                </style>
              </head>
          <body onload="window.print();window.close()">${printContents}</body>
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

  close() {
    this._viewCombinedReportDialog.close();
  }

}
