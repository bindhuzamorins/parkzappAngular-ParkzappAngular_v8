import { UtilsService } from './../../../../utils.service';
import { UsersService } from './../users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './delete.template.html',
    styleUrls: ['./delete.template.css'],
    providers: [
        UsersService,
        UtilsService
    ]
})
export class DeleteUserDialog {
    serviceId: any;
    authToken: any;
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Delete';

    constructor(
        public _dialog: MatDialogRef<DeleteUserDialog>,
        private _utils: UtilsService,
        private _usersService: UsersService,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.serviceId = this._utils.serviceId;
      }
    

    /**DELETE USER */
    delete() {
        this.btnStatus = false;
        this.btnLabel = 'Deleting! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.user_id);
        input.append('serviceId', this.serviceId);
        this._usersService.delete(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this._dialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Delete';
                }

            });
    }


    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }


}