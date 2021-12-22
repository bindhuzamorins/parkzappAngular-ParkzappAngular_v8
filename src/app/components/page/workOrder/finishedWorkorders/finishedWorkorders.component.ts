import { WorkOrderDetailsDialog } from './view/view.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './../../../../app.component';
import { WorkOrderService } from './../workOrder.service';
import { UtilsService } from './../../../../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finishedWorkorders',
  templateUrl: './finishedWorkorders.component.html',
  styleUrls: ['./finishedWorkorders.component.css'],
  providers: [
    UtilsService,
    WorkOrderService
  ]

})
export class FinishedWorkordersComponent implements OnInit {
  planId: any;
  viewMore: any;
  serviceId: any;
  length: any;
  finishedWorks: any;
  pdfPath: any;
  snackMessage: any;
  items: any[];
  works: any;
  authToken: any;
  searchBtnLabel = 'Search';
  searchBtnStatus = true;
  filterArray: any = { filter_by: '' };
  dataFetchStatus = false;
  loadStatus = false;
  messageStatus = false;
  allmaxDate = new Date();
  planprintStatus = false;

  minDate = new Date('1-1-2000');
  maxDate = new Date();
  dateone: any;
  datetwo: any;
  fromDate: any;
  toDate: any;
  public defaultUrl = this._utils.defaultUrl;

  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _workOrderService: WorkOrderService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchFinishedOrder();
    this.fetchCommonTask();
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

  /** FETCH ALL PARKS */
  fetchFinishedOrder() {
    this.loadStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._workOrderService.fetchFinishedOrder(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.finishedWorks = response.data;
          this.loadStatus = false;
          const len = this.finishedWorks.length;
          this.items = [];

          this.length = len;

          for (let i = 0; i < len; i++) {
            this.items.push({
              filter_by: response.data[i].filter_by
            });
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 2000
          });
          this.loadStatus = false;
          this.dataFetchStatus = false;
          this.messageStatus = true;
        }
      });
  }

  /** FETCH DATA BETWEEN DATE */
  finishedOrder(value: any) {
    this.loadStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();

    const year = this.dateone.getFullYear();
    const month = this.dateone.getMonth() + 1;
    const day = this.dateone.getDate();
    this.fromDate = year + "-" + month + "-" + day;
    console.log(this.fromDate);
    const year1 = this.datetwo.getFullYear();
    const month1 = this.datetwo.getMonth() + 1;
    const day1 = this.datetwo.getDate();
    this.toDate = year1 + "-" + month1 + "-" + day1;
    console.log(this.toDate);
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);

    this._workOrderService.fetchFinishedOrder(input)
      .subscribe(response => {

        if (response.response_code === '1') {
          console.log(response.data);
          this.dataFetchStatus = true;
          this.finishedWorks = response.data;
          this.loadStatus = false;
          const len = this.finishedWorks.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              filter_by: response.data[i].filter_by
            });
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 2000
          });
          this.loadStatus = false;
          this.dataFetchStatus = false;
          this.messageStatus = true;
        }
      });
  }


  /** VIEW MORE ABOUT WORK ORDER  */
  view(value: any) {
    // console.log(value);
    const dialog = this._mdDialog.open(WorkOrderDetailsDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      // this.fetchAllRecurrence();
    });
  }

  /** DOWNLOAD WORK ORDER  */
  print(value: any, element) {
    element.textContent = 'Please Wait..';
    element.disabled = false;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', value.id);
    console.log(value.id);
    input.append('workOrderNumber', value.workOrderNo);
    this._workOrderService.print(input)
      .subscribe(response => {
        console.log(response);
        if (response.response_code === '1') {

          let printContents, popupWin;
          printContents = response.data;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          popupWin.document.write(`
            <html>
              <head>
              
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

}
