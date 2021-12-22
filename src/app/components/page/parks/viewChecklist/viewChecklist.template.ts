import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './viewChecklist.template.html',
    styleUrls: ['./viewChecklist.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class ViewParkChecklistDialog implements OnInit {
    updatedChecklist: string;
    selectedChecklist: any;
    checklist: any[];
    editMode: string;
    btnStatus = false;
    btnLabel = 'Update check list';
    moreDetails: any;
    defaultChecklists: any;
    private authToken: any = this._utils.fetchAuthtokenTokenString();

    constructor(
        public _dialog: MatDialogRef<ViewParkChecklistDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService

    ) {

    }

    ngOnInit(): void {
        this.fetchSelectedParkAssessmentChecklist();
    }


    /**FETCH SELECTED PARK ASSESSMENT CHECKLIST */
    fetchSelectedParkAssessmentChecklist() {
        var len = this.defaultChecklists.length;
        this.checklist = [];
        for (let i = 0; i < len; i++) {
            this.checklist.push({
                label: this.defaultChecklists[i].list,
                id: this.defaultChecklists[i].id,
                status: false,
            });
        }
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('parkId', this.moreDetails.id);
        this._parksService.fetchParkAssessmentChecklist(input)
            .subscribe(response => {
                if (response.response_code == '0') {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                } else {
                    this.selectedChecklist = response.data;
                    var len = this.selectedChecklist.length;
                    for (let i = 0; i < len; i++) {
                        this.checklist[this.selectedChecklist[i].checkListId - 1].status = this.selectedChecklist[i].status;
                    }
                }

            });
    }

    updateChecklist(value: any) {
        this.btnStatus = true;
        if (this.checklist[value.id - 1].status == true) {
            this.checklist[value.id - 1].status == true
        } else {
            this.checklist[value.id - 1].status == false
        };
    }


    // /**EDIT USER DATA */
    update() {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        const input = new FormData();
        this.updatedChecklist = JSON.stringify(this.checklist);
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('checkList', this.updatedChecklist);
        this._parksService.updateParkAssessmentChecklist(input)
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
                    this.btnLabel = 'Update check list';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

}