import { EmailsService } from './../../emails/emails.service';
import { WorkOrderService } from './../workOrder.service';
import { ParksService } from './../../parks/parks.service';
import { AppComponent } from './../../../../app.component';
import { UtilsService } from './../../../../utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generateWorkorder',
  templateUrl: './generateWorkorder.component.html',
  styleUrls: ['./generateWorkorder.component.css'],
  providers: [
    UtilsService,
    ParksService,
    WorkOrderService,
    EmailsService
  ]

})
export class GenerateWorkorderComponent implements OnInit {
  emails: any;
  snackMessage: string;
  image: string;
  description: any;
  email: any;
  park: any;
  wonumber: any;
  imageFile: any;
  parks: any;
  workOrderNumber: number;
  btnStatus = true;
  btnLabel = 'Generate Work Order';
  imageFileStatus = true;
  authToken:any = this._utils.fetchAuthtokenTokenString();
  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _parkService: ParksService,
    private _workOrderService: WorkOrderService,
    private _snackBar: MatSnackBar,
    private _emailsService: EmailsService,

  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.cerateRandum();
    this.fetchParks();
    this.fetchEmail();
  }

  //  CODE FOR GENERATE WORK ORDER NUMBER
  cerateRandum() {
    this.wonumber = 'W.O # ' + Math.floor((Math.random() * 9999999999) + 1111111111);
    // console.log(this.workOrderNumber);
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    const input = new FormData();
    input.append('token', this.authToken);
    this._parkService.fetchData(input)
      .subscribe(response => {
        this.parks = response.data[0].parks;
      });
  }

  /**VALIDATE LOGO IMAGE FILE */
  fileEvent(fileInput: any) {
    this.imageFile = fileInput.target.files[0];
    // console.log(this.imageFile);
    if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
      || this.imageFile.type === 'image/jpg') {
      this.imageFileStatus = true;
    }
    else {
      this._snackBar.open('Please select an image file!', 'CLOSE', {
        duration: 2000,
      });
      this.imageFile = '';
      this.imageFileStatus = false;
    }
  }

  /**FETCH EMAIL LIST */
  fetchEmail() {
    const input = new FormData();
    input.append('token', this.authToken);
    this._emailsService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.emails = response.data;
        } else {
          this.snackMessage = 'No emails in the email list.';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });

  }


  /** ADD RECURRENCE */
  generate() {
    this.btnStatus = false;
    this.btnLabel = 'Generating! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('workOrderNumber', this.wonumber);
    input.append('ParkId', this.park);
    input.append('email', this.email);

    input.append('description', this.description);
    input.append('attachment', this.imageFile);
    // console.log(this.wonumber);
    this._workOrderService.generate(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          this.park = null;
          this.email = null;
          this.description = null;
          this.image = null;
          this.wonumber = null;
          this.cerateRandum();
          this.btnLabel = 'Generate Work Order';
          this.btnStatus = true;
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
