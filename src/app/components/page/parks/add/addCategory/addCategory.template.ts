import { ParksService } from './../../parks.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './addCategory.template.html',
    styleUrls: ['./addCategory.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class AddParkCategoryDialog implements OnInit {
    name: any;
    description: any;
    authToken: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Add new category';
    constructor(
        public addDialog: MatDialogRef<AddParkCategoryDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService

    ) {

    }

    ngOnInit() {
    }


    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('categoryFeature', this.description);
        input.append('categoryName', this.name);
        input.append('token', this.authToken);
        this._parksService.addNewParkCategory(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.addDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Add new category';
                }
            })
    }

    /*CLOSE DIALOG*/
    close() {
        this.addDialog.close();
    }
}