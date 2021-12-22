import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../../../app.component';
import { WorkOrderService } from './../../workOrder.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-reassign',
  templateUrl: './reassign.component.html',
  styleUrls: ['./reassign.component.css'],
  providers: [
      UtilsService,
      WorkOrderService,
      AppComponent,
  ]
})
export class ReassignDialog implements OnInit {
  newemail: any;
  serviceId: any;
  authToken: any;
  emails: any;
  btnStatus = true;
  btnLabel = 'Submit';
  snackMessage: any;
  reassignDetails: any;



  constructor(
    public reassign: MatDialogRef<ReassignDialog>,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _workOrderService: WorkOrderService,
    private _appComponent: AppComponent,

  ) { }

  ngOnInit() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchEmail();
  }

  /*CLOSE DIALOG*/
  close() {
    this.reassign.close();
}

   /**FETCH EMAIL LIST */
  fetchEmail() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._workOrderService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.emails = response.data;
          console.log(this.emails);
        } else {
          this.snackMessage = 'No emails in the email list.';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }

  add() {    
        this.btnStatus = false;
        this.btnLabel = 'Reassigning! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('workOrderNumber', this.reassignDetails.workOrderNo);
        input.append('updateId', this.reassignDetails.id);
        input.append('description', this.reassignDetails.workDesc);
        input.append('ParkId', '1');
        input.append('email', this.newemail);  
       // input.append('ParkId', this.park);
        // console.log(this.wonumber);
        this._workOrderService.reAssign(input)
          .subscribe(response => {
            if (response.response_code === '1') {
              this._snackBar.open(response.message, 'CLOSE', {
                duration: 2000,
              });
              this.btnLabel = 'Submit';
              this.btnStatus = true;
              this.reassign.close();
            } else {
              this._snackBar.open(response.message, 'CLOSE', {
                duration: 2000,
              });
              // this.btnStatus = true;
              // this.btnLabel = 'Add new recurrence';
            }
          });
      }

}
