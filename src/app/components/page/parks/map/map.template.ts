import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './map.template.html',
    styleUrls: ['./map.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class MapParkDialog {
    newLog: any;
    newLat: any;
    m:any;
    latAndLog: MouseEvent;
    imageUrl: string;
    moreDetails: any;
    loadingStatus: boolean;
    private authToken: any = this._utils.fetchAuthtokenTokenString();

    constructor(
        public _dialog: MatDialogRef<MapParkDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        this.latAndLog = $event;
        this.loadingStatus = true;
        this.newLat = this.latAndLog['coords'].lat;
        this.newLog = this.latAndLog['coords'].lng;
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('parkId', this.moreDetails.id);
        input.append('longitude', this.newLog);
        input.append('lattitude', this.newLat);
        this._parksService.updateLocation(input)
            .subscribe(response => {
                this.loadingStatus = false;
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                }

            })
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }


}

// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}