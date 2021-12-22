import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './viewMore.template.html',
    styleUrls: ['./viewMore.template.css'],
    providers: [
        UtilsService,
    ]
})
export class ViewComplaintDetailsDialog {
    imageUrl: string;
    moreDetails: any;
    constructor(
        public viewMore: MatDialogRef<ViewComplaintDetailsDialog>,
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