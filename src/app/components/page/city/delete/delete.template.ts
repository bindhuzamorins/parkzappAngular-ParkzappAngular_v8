import { CityService } from './../city.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './delete.template.html',
    styleUrls: ['./delete.template.css'],
    providers: [
        UtilsService,
        CityService
    ]
})
export class DeleteMoreCityDetailsDialog {
    authToken: any;
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Delete';

    constructor(
        public deleteCity: MatDialogRef<DeleteMoreCityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _cityService: CityService
    ) {
    }

    delete() {
        this.btnStatus = false;
        this.btnLabel = 'Deleting! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        this._cityService.deleteData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.deleteCity.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Delete';
                }

            })
    }

    /*CLOSE DIALOG*/
    close() {
        this.deleteCity.close();
    }
}