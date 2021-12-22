import { MapServicesDialog } from './../mapServices/mapServices.templete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../utils.service';
import { Router } from '@angular/router';
import { NewServicesService } from './newServices.service';

@Component({
  templateUrl: './newServices.templete.html',
  styleUrls: ['./newServices.templete.css'],
  providers: [
    UtilsService,
    NewServicesService
  ]
})

export class NewServicesDialog implements OnInit {
  closeButtonStatus: boolean;
  serviceId: any;
  activeservice : any = '';
  snackMessage: any;
  authToken: any;
  userName: any;
  constructor(
    public _NewServicesService: NewServicesService,
    public _dialog: MatDialogRef<NewServicesDialog>,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _utils: UtilsService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.serviceId = this._utils.fetchServiceId();
    if (!this.serviceId) {
      this.closeButtonStatus = false;
    } else {
      this.closeButtonStatus = true;
    }
    this.fetchCommonTask();
   
  }

  fetchCommonTask() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.userName = response.data[0].userName;
        this.activeservice = response.data[0].services;
        console.log(this.activeservice['Sports Field Inspection']);
      });
  }

  // FUNCTION FOR SETTING SERVICE ID
  switchTo(value: any) {
    if(this._utils.fetchServiceId()!='')
    {
       this.switchoflogin(value);
     
       this.serviceId = this._utils.fetchServiceId();
    }else{
      this._utils.createServiceId(value);
      this.serviceId = this._utils.fetchServiceId();
      // window.location.reload();
    }
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._NewServicesService.fetchMApServiceData(input)
      .subscribe(response => {
       
      if(response.data.length !== 0)
       {
        const _dialog1 = this._mdDialog.open(MapServicesDialog, { disableClose: true });
        _dialog1.componentInstance.moreDetails = response.data;
        let ServiceName = '';
       if(this.serviceId==1){
           ServiceName='Playground Inspection';
       }
          if(this.serviceId==2){
            ServiceName='Ice Arena Safety Inspection';
        }
          if(this.serviceId==3){
            ServiceName='Building Inspection';
        }
          if(this.serviceId==4){
            ServiceName='Sports Field Inspection';
        }

        if(this.serviceId==5){
          ServiceName='FIRE Inspection';
        }
        if(this.serviceId==6){
          ServiceName='Parking Lot/Side Walk Inspection';
        }
          
        _dialog1.componentInstance.ServiceName = ServiceName;
        this.close();
       }else
       {
        this.close();
       }

      });


  }

  switchoflogin(value: any)
  {
    this._utils.createServiceId(value);
    this.serviceId = this._utils.fetchServiceId();

    this._router.navigateByUrl('/');
    window.location.reload();
    
    if(this.serviceId === '1')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "green") 
    }
    if(this.serviceId === '2')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "azure") 
    }
    if(this.serviceId === '3')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "purple") 
    }
    if(this.serviceId === '4')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "orange") 
    }
    if(this.serviceId === '5')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "red") 
    }
    if(this.serviceId === '6')
    {
      document.getElementById('greenmenu').setAttribute("data-color", "#3E2723") 
    }

  }
  /*CLOSE DIALOG*/
  close()
   {
    this._dialog.close();
  }

  mapTo()
  {

 
//  console.log(_dialog);
  }
}