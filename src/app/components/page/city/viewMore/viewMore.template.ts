import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CityService } from './../city.service';

@Component({
    moduleId: module.id,
    templateUrl: './viewMore.template.html',
    styleUrls: ['./viewMore.template.css'],
    providers: [
        CityService,
        UtilsService
    ]
})
export class ViewMoreCityDetailsDialog implements OnInit {
    imageUrl: string;
    moreDetails: any;
    country : any;
    constructor(
        public viewMore: MatDialogRef<ViewMoreCityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _cityService: CityService,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }
    ngOnInit() {
        this._cityService.fetchSelectedCountries()
        .subscribe(response => {

           const con =response;
                const len = con.length;
             
                for (let i = 0; i < len; i++) {
                 
                    if(con[i].code === this.moreDetails.country)
                    {
                       
                      this.country = con[i].name;
                    }
                   
                }
        });
    }

}