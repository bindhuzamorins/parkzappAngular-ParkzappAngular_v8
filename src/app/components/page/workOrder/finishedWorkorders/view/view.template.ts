import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './view.template.html',
    styleUrls: ['./view.template.css'],
    providers: [
        UtilsService
    ]
})
export class WorkOrderDetailsDialog {
    imageUrl: string;
    moreDetails: any;
    constructor(
        public viewMore: MatDialogRef<WorkOrderDetailsDialog>,
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