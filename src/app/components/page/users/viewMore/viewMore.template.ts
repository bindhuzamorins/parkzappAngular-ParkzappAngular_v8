import { UsersService } from './../users.service';
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
        UsersService
    ]
})
export class ViewMoreUserDialog implements OnInit {
    imageName: string;
    imageStatus: boolean;
    moreDetails: any;
    imageUrl: string;
    constructor(
        public viewMore: MatDialogRef<ViewMoreUserDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService

    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    ngOnInit() {
        //const imagepic = this.moreDetails.profile_image;
        //console.log('from sole ' + imagepic);
        if (this.moreDetails.profile_image === 'defaultuserimage.png') {
            this.imageName = 'assets/user.png';
            console.log('from default ' + this.imageName);
        } else {
            this.imageName = this.imageUrl + this.moreDetails.profile_image;
            console.log('from original ' + this.imageName);
        }
        //this.imageStatus = imagepic.includes('defaultuserimage.png');
    }


    /**TRIGER WHEN LOAD COMPLETED AND HIDE LOADING IMAGE */
    // loadCompleted() {
    //     this.imageStatus = true;
    // }

    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }
}