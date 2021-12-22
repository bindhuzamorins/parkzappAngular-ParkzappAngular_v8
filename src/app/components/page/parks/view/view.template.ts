import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './view.template.html',
    styleUrls: ['./view.template.css'],
    providers: [
        UtilsService
    ]
})
export class ViewParkDialog {
    imageUrl: string;
    moreDetails: any;
    serviceId: any;
    serviceThree: boolean;
    constructor(
        public _dialog: MatDialogRef<ViewParkDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    ngOnInit() {
        this.serviceId = this._utils.serviceId;
         this.viewParkname();
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
    // FUNCTION FOR CHANGING div W R TO SERVICES
    viewParkname() {
        this.serviceId = this._utils.fetchServiceId();
            
        if (this.serviceId === '3' ) {
            this.serviceThree = true;
        }
    }    
}