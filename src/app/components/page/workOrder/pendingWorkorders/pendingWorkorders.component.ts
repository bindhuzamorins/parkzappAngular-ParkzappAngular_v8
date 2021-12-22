import { FinishedWorkordersComponent } from './../finishedWorkorders/finishedWorkorders.component';
import { pendingWorkOrderDetailsDialog } from './view/view.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './../../../../app.component';
import { WorkOrderService } from './../workOrder.service';
import { UtilsService } from './../../../../utils.service';
import { Component, OnInit } from '@angular/core';
import { ViewNoteDialog } from './viewNote/viewNote.component';
import { ReassignDialog } from './reassign/reassign.component';

@Component({
  selector: 'app-pendingWorkorders',
  templateUrl: './pendingWorkorders.component.html',
  styleUrls: ['./pendingWorkorders.component.css'],
  providers: [
    UtilsService,
    WorkOrderService,
    FinishedWorkordersComponent
  ]

})
export class PendingWorkordersComponent implements OnInit {
  serviceId: any;
  pendingWorks: any;
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
  allmaxDate= new Date();
  minDate = new Date('1-1-2000');
  maxDate = new Date();
  dateone:  any;
  datetwo:  any;
  fromDate: any;
  toDate: any;
  
  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _workOrderService: WorkOrderService,
    private _finishedWorkordersComponent: FinishedWorkordersComponent,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,

  ) { }

  ngOnInit(
  ) {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.serviceId;
    this.fetchPendingOrder();
  }

  /** FETCH ALL PARKS */
  fetchPendingOrder() {
    this.loadStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._workOrderService.fetchPendingOrder(input)
      .subscribe(response => {
        
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.pendingWorks = response.data;
          console.log( this.pendingWorks);
          this.loadStatus = false;
          const len = this.pendingWorks.length;
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

  /** FETCH DATA BETWEEN DATE */
  pendingOrder(value: any) {
    this.loadStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
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
    input.append('serviceId', this.serviceId);

    input.append('fromDate', this.fromDate);
    input.append('toDate', this.toDate);

    this._workOrderService.fetchPendingOrder(input)
      .subscribe(response => {

        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.pendingWorks = response.data;
          this.loadStatus = false;
          const len = this.pendingWorks.length;
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
    const dialog = this._mdDialog.open(pendingWorkOrderDetailsDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      this.fetchPendingOrder();
      // this._finishedWorkordersComponent.fetchFinishedOrder();
    });
  }

/** view Note ABOUT WORK ORDER  */
viewNote(value) {
  // console.log(value);
  const dialog = this._mdDialog.open(ViewNoteDialog, { disableClose: true });
   dialog.componentInstance.noteDetails = value;
   dialog.afterClosed().subscribe(result => {
     this.fetchPendingOrder();
   });
}

reassign(value) {
  const dialog = this._mdDialog.open(ReassignDialog, { disableClose: true });
  dialog.componentInstance.reassignDetails = value;
  dialog.afterClosed().subscribe(result => {
    this.fetchPendingOrder();
  });

}


  choosemindate()
  {    
    this.minDate = new Date(this.dateone);
     console.log('min date is' + this.minDate);
  }

  choosemaxdate()
  {
    this.maxDate = new Date(this.datetwo);
    console.log(this.maxDate);
  }

}
