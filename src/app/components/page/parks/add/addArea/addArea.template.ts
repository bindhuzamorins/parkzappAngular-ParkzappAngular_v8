import { ParksService } from './../../parks.service';
import { UtilsService } from './../../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './addArea.template.html',
    styleUrls: ['./addArea.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class AddAreaDialog implements OnInit {
    serviceId: any;
    area: any;
    city: any;
    cities: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Add new area';
    private authToken: any = this._utils.fetchAuthtokenTokenString();

    constructor(
        public addDialog: MatDialogRef<AddAreaDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService

    ) {

    }

    ngOnInit() {
        this.serviceId = this._utils.serviceId;
        this.fetchCities();
    }

    /**FETCH CITIES */
    fetchCities() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);

        this._parksService.fetchCities(input)
            .subscribe(response => {
                this.cities = response.data;
            });
    }


    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('city', this.city);
        input.append('area', this.area);
        input.append('token', this.authToken);
        this._parksService.addNewArea(input)
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
                    this.btnLabel = 'Add new area';
                }
            })
    }

    /*CLOSE DIALOG*/
    close() {
        this.addDialog.close();
    }
}