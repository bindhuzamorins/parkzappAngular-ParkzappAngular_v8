import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './moreDetails.template.html',
    styleUrls: ['./moreDetails.template.css'],
    providers: [
        UtilsService
    ]
})
export class PlanMoreDetailsDialog {
    imageUrl: string;
    maximumUser:any;
    validity:any;
    moreDetails: any;
    constructor(
        public viewMore: MatDialogRef<PlanMoreDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }
}