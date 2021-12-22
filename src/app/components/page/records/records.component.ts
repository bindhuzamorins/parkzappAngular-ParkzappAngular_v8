import { DeleteRecordDialog } from './delete/delete.template';
import { AddRecordDialog } from './add/add.template';
import { ViewRecordDialog } from './view/view.template';
import { AppComponent } from './../../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from './../../../utils.service';
import { RecordsService } from './records.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [
    RecordsService,
    UtilsService
  ]
})
export class RecordsComponent implements OnInit {
  serviceId: any;
  tableDataStatus: boolean = true;
  imageUrl: string;
  snackMessage: any;
  items: any[];
  records: any;
  dataFetchStatus: boolean;
  private authToken:any = this._utils.fetchAuthtokenTokenString();
  filterArray: any = { asset_name: '' };
  placeholderName: string;
 


  constructor(
    private _recordsService: RecordsService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.fetchData();
    this.imageUrl = this._utils.imageUrl;
    this.placeholder();
   
  }

  fetchData() {
    const input = new FormData();
    input.append('serviceId', this.serviceId);
    input.append('token', this.authToken);
    this._recordsService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.records = response.data;
          if (this.records == null) {
            this.tableDataStatus = false;
          } else {
            this.tableDataStatus = true;
            const len = this.records.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                asset_name: response.data[i].asset_name
              });
            }
          }

        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }

      })
  }

  /**VIEW MORE BUTTON */
  view(value) {
    const _dialog = this._mdDialog.open(ViewRecordDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
  }

  /**ADD BUTTON */
  add() {
    const _dialog = this._mdDialog.open(AddRecordDialog, { disableClose: true });
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value) {
    const _dialog = this._mdDialog.open(DeleteRecordDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  // FUNCTION FOR CHANGING Texts W R TO SERVICES
  placeholder() {
    this.serviceId = this._utils.fetchServiceId();
    
    if (this.serviceId === '1') {  
      this.placeholderName = 'Park Name';
     } else if (this.serviceId === '2') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '3') {
      this.placeholderName = 'Building Name';
    } 
    else if (this.serviceId === '4') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '5') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '6') {
      this.placeholderName = 'Park Name';
    } 



  }
}
