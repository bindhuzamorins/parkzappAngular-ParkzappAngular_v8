import { UtilsService } from './../../../../utils.service';
import { UsersService } from './../users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './viewParks.template.html',
    styleUrls: ['./viewParks.template.css'],
    providers: [
        UsersService,
        UtilsService
    ]
})
export class ViewParksUserDialog implements OnInit {
    items: any[];
    p: any;
    authToken: string | boolean;
    moreDetails: any;
    assignedParks: any;
    filterArray: any = { park_name: '' };
    serviceId: any;
    searchName: string;
    inspectionType: string;
    userHead: string;
    serviceThree: boolean;
    constructor(
        private _dialog: MatDialogRef<ViewParksUserDialog>,
        private _usersService: UsersService,
        private _utils: UtilsService,

    ) {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        // this.fetchAssignedParks();
    }

    ngOnInit() {
        this.items = [];
        const len = this.assignedParks.length;
        for (let i = 0; i < len; i++) {
            this.items.push({
                park_name: this.assignedParks[i].park_name
            });
        }
        this.serviceId = this._utils.serviceId;
        this.viewUser();
    }


    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

    viewUser() {
        this.serviceId = this._utils.fetchServiceId();
    
        if (this.serviceId === '1' ) {
          this.searchName = 'Search Park name...';
          this.inspectionType = 'Parks';
          this.userHead = ' Park name';

        }
    
        if (this.serviceId === '2' ) {
            this.searchName = 'Search Park name...';
            this.inspectionType = 'Parks';
            this.userHead = ' Park name';

        }
            
        if (this.serviceId === '3' ) {
            this.serviceThree = true;
            this.searchName = 'Search Building name... ';
            this.inspectionType = 'Buildings';
            this.userHead = ' Building name';

    
        }
    
        if (this.serviceId === '4' ) {
            this.searchName = 'Search Park name...';
            this.inspectionType = 'Parks';
            this.userHead = ' Park name';

    
        }
    
        if (this.serviceId === '5' ) {
            this.searchName = 'Search Park name...';
            this.inspectionType = 'Parks';
            this.userHead = ' Park name';

    
        }
    
        if (this.serviceId === '6' ) {
            this.searchName = 'Search Park name...';
            this.inspectionType = 'Parks';
            this.userHead = ' Park name';

    
        }
      }
}