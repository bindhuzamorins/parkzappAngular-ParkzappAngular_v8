import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './video.template.html',
    styleUrls: ['./video.template.css'],
    providers: [
        UtilsService,
    ]
})
export class VideoDialog implements OnInit {
    clientCode: any;
 
    authToken: string | boolean;
    public videoUrl = this._utils.videoUrl;
    moreDetails: any;
    currentProfileImage : any;
    constructor(
        public _videoDialog: MatDialogRef<VideoDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
    ) {

    }
    ngOnInit() {
      
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._videoDialog.close();
    }
}
