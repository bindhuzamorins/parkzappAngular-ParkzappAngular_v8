import { DeleteInspectionDialog } from 'app/components/page/parks/viewInspections/delete/delete.template';
import { ParksService } from './../parks.service';
import { AddInspectionDialog } from './add/addInspection.template';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { EditInspectionDialog } from 'app/components/page/parks/viewInspections/edit/editInspection.template';

@Component({
    //moduleId: module.id,
    templateUrl: './viewInspections.template.html',
    styleUrls: ['./viewInspections.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class ViewInspectionsDialog implements OnInit {
    items: any[];
    imageUrl: string;
    filterArray: any = { inspectionType: '' };
    moreDetails: any;
    p:any;
    assignedInspections: any= [];
    private authToken = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _mdDialog: MatDialog,
        public _dialog: MatDialogRef<ViewInspectionsDialog>,
        private _snackBar: MatSnackBar,
        private _parksService: ParksService,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }


    ngOnInit(): void {
        this.items = [];
        const len = this.assignedInspections.length;
        for (let i = 0; i < len; i++) {
            this.items.push({
                inspectionType: this.assignedInspections[i].inspectionType
            });
        }
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

    /**ADD INSPECTION */
    add() {
        const _dialog2 = this._mdDialog.open(AddInspectionDialog, { disableClose: true });
        _dialog2.componentInstance.moreDetails = this.moreDetails;
        this._dialog.close();
        // _dialog2.afterClosed().subscribe(result => {
        //     this._dialog.close();
        // });
    }

    /**ADD INSPECTION */
    edit(value: any) {
        const _dialog2 = this._mdDialog.open(EditInspectionDialog, { disableClose: true });
        _dialog2.componentInstance.moreDetails = this.moreDetails;
        _dialog2.componentInstance.formValues = value;
        this._dialog.close();
        // this._dialog.close();
        // _dialog2.afterClosed().subscribe(result => {
        //     this._dialog.close();
        // });
    }

    /**ADD INSPECTION */
    delete(value: any) {
        const _dialog2 = this._mdDialog.open(DeleteInspectionDialog, { disableClose: true });
        _dialog2.componentInstance.moreDetails = this.moreDetails;
        _dialog2.componentInstance.selectedData = value;
        this._dialog.close();
        // this._dialog.close();
        // _dialog2.afterClosed().subscribe(result => {
        //     this._dialog.close();
        // });
    }


}