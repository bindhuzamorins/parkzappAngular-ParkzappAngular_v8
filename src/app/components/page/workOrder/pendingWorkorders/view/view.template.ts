import { AppComponent } from './../../../../../app.component';
// import { FinishedWorkordersComponent } from './../../finishedWorkorders/finishedWorkorders.component';
import { WorkOrderService } from './../../workOrder.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './view.template.html',
    styleUrls: ['./view.template.css'],
    providers: [
        UtilsService,
        WorkOrderService,
        // FinishedWorkordersComponent,
        AppComponent
    ]
})
export class pendingWorkOrderDetailsDialog implements OnInit {
    snackMessage: any;
    items: any[];
    finishedWorks: any;
    value: any;
    time1: any;
    time2: any;
    time: any;
    date: any;
    material: any;
    completedBy: any;
    authToken: any;
    imageUrl: string;
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Submit';
    hour : any;
    mins : any[];
    minDate = new Date('1-1-2000');
    maxDate = new Date();
    ngOnInit() {
        this.hour =[];
        let i :any =0;
        for( i=0;i<=100;i++){
          this.hour.push(i);
          
        }
        this.mins =[];
         let j :any =0;
         for( j=0;j<=59;j++){
          this.mins.push(j);
         
        }
        const dateass = new Date(this.moreDetails.date);
        const year  = dateass.getFullYear();
        const month = dateass.getMonth()+1;
        const day = dateass.getDate();
        this.minDate = new Date(month+"/"+day+"/"+year);
      }

    constructor(
        public viewMore: MatDialogRef<pendingWorkOrderDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _workOrderService: WorkOrderService,
        // private _finishedWorkordersComponent: FinishedWorkordersComponent,
        private _appComponent: AppComponent,
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }

    submit(value: any) {
        console.log(value);
        this.btnStatus = false;
        this.btnLabel = 'Submitting! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        const year  = this.date.getFullYear();
        const month = this.date.getMonth()+1;
        const day = this.date.getDate();
        this.date = year+"-"+month+"-"+day;
        input.append('token', this.authToken);
        input.append('workOrderNumber', this.moreDetails.workOrderNo);
        input.append('completedBy', this.completedBy);
        input.append('materials', this.material);
        input.append('repairedDate', this.date);
        input.append('hours', this.time1 + '.'+this.time2);
        input.append('id', value);
        this._workOrderService.submit(input)
            .subscribe(response => {
                if (response.response_code === '1') {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this.viewMore.close();
                    // this._finishedWorkordersComponent.fetchFinishedOrder();
                    // this.fetchFinishedOrder();
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });

    }

    removeFutureDate() {
        var selectedText = this.date;
        var selectedDate = new Date(selectedText);
        var now = new Date();
        if (selectedDate > now) {
            this._snackBar.open('Please select current or past date', 'CLOSE', {
                duration: 3000,
            });
            this.date = null;
        }
    }

    /** FETCH ALL PARKS */
    //   fetchFinishedOrder() {
    //     //this.loadStatus = true;
    //     this.authToken = this._utils.fetchAuthtokenTokenString();
    //     const input = new FormData();
    //     input.append('token', this.authToken);
    //     this._workOrderService.fetchFinishedOrder(input)
    //       .subscribe(response => {

    //         if (response.response_code === '1') {
    //           //this.dataFetchStatus = true;
    //           this.finishedWorks = response.data;
    //           //this.loadStatus = false;
    //           const len = this.finishedWorks.length;
    //           this.items = [];
    //           for (let i = 0; i < len; i++) {
    //             this.items.push({
    //               workOrderNo: response.data[i].workOrderNo
    //             });
    //           }
    //         } else {
    //           this.snackMessage = response.message;
    //           this._snackBar.open(this.snackMessage, 'OKAY', {
    //             duration: 2000
    //           });
    //           //this.loadStatus = false;
    //           //this.dataFetchStatus = false;
    //           //this.messageStatus = true;
    //         }
    //       });
    //   }

}