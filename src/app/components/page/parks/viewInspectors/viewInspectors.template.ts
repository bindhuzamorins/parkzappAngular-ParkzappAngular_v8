import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './viewInspectors.template.html',
    styleUrls: ['./viewInspectors.template.css'],
    providers: [
        UtilsService
    ]
})
export class ViewInspectorsDialog implements OnInit {
    items: any[];
    filterArray: any = { inspector: '' };
    imageUrl: string;
    moreDetails: any;
    p: any;
    assignedInspectors: any;
    constructor(
        public _dialog: MatDialogRef<ViewInspectorsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    ngOnInit() {
        this.items = [];
        const len = this.assignedInspectors.length;
        for (let i = 0; i < len; i++) {
            this.items.push({
                inspector: this.assignedInspectors[i].inspector
            });
        }
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

}