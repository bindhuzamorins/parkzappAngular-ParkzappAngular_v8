//import { AppComponent } from './../../../app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../utils.service';
import { Router } from '@angular/router';
import { MapServicesService } from './mapServices.service';

// import { MatExpansionModule } from '@angular/material/typings/expansion';

@Component({
  templateUrl: './mapServices.templete.html',
  styleUrls: ['./mapServices.templete.css'],
  providers: [
    UtilsService,
    MapServicesService
  ]
})

export class MapServicesDialog implements OnInit {
  moreDetails: any;
  showme: boolean = false;
  closeButtonStatus :boolean;
  Button1Status= false;
  Button1Name = "Map";
  Button2Status= false;
  Button2Name = "Cancel";
  serviceId: any;
  ServiceName: any;
  snackMessage: any;
  park : any;
  user: any;
  email : any;
  amenity : any;
  schedule : any;
  authToken: any;
  userName: any;
  constructor(
    public _MapServicesService: MapServicesService,
    public _dialog: MatDialogRef<MapServicesDialog>,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _utils: UtilsService,
  //  public _appComponent: AppComponent,
    private _router: Router,
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
      });
  }

  savemap()
  {
    this.Button1Status = true;
    this.Button1Name = 'Mapping! Please wait...';
    const input = new FormData();
    this.serviceId = this._utils.fetchServiceId();
    input.append('park', this.park);
   
    input.append('user', this.user);
    input.append('email', this.email);
    input.append('amenity', this.amenity);
    input.append('schedule', this.schedule);
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._MapServicesService.Mapdata(input)
    .subscribe(response => {
        if (response.response_code == '1') {
        
                this.snackMessage =response.message;
                this._snackBar.open(this.snackMessage, 'OKAY', {
                    duration: 5000,
                });
                this._dialog.close();
                this.Button1Status = false;
                this.Button1Name = 'Map';
            
        } else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
                duration: 5000,
            });
            this.Button1Status = false;
            this.Button1Name = 'Map';
        }
    });


  }
  cancelmap(){
    this.Button2Status = true;
    this.Button2Name = 'Canceling! Please wait...';
    const input = new FormData();
    this.serviceId = this._utils.fetchServiceId();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
      this._MapServicesService.CancelMapdata(input)
    .subscribe(response => {
        if (response.response_code == '1') {
         console.log(response.data);
                this.snackMessage =response.message;
                this._snackBar.open(this.snackMessage, 'OKAY', {
                    duration: 5000,
                });
                this.Button2Status = false;
                this.Button2Name = 'Cancel';
                this._dialog.close();

            
        } else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
                duration: 5000,
            });
            this.Button2Status = false;
            this.Button2Name = 'Cancel';
        }
    });



  }

  /*CLOSE DIALOG*/
  close()
  {
    this._dialog.close();
  }
}