import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { mfrDialog } from './mfr/mfr.template';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
    //moduleId: module.id,
    templateUrl: './viewEquipments.template.html',
    styleUrls: ['./viewEquipments.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class ViewEquipmentsDialog implements OnInit {
    btnStatus1: false;
    mfrDialog: any;
    pNoteStatus: boolean;
    visible: any;
    p: any;
    newequipment: any;
    fetchAssignedEquipments: any;
    items: any[];
    snackMessage: string;
    selectedEquipments: any = [];
    equipments: any = [];
    imageUrl: string;

    moreDetails: any;
    assignedEquipments: any = [];
    newEquipments: any;
    btnStatus = false;
    equipmentStatus = true;
    btnLabel = 'Add Equipment';
    filterArray: any = { equipmentName: '' };
    private authToken: any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog1: MatDialogRef<ViewEquipmentsDialog>,
        private _snackBar: MatSnackBar,
        public _mdDialog1: MatDialog,
        private _utils: UtilsService,
        private _parksService: ParksService
    ) {
        this.imageUrl = this._utils.imageUrl;

    }

    ngOnInit(): void {
        this.imageUrl = this._utils.imageUrl;
        this.fetchEquipments();
        this.selectedEquipments = this.assignedEquipments;
        const len = this.selectedEquipments.length;
        this.newEquipments = [];
        this.items = [];
        for (let i = 0; i < len; i++) {
            this.newEquipments.push(
                this.selectedEquipments[i].equipmentId
            );
            this.items.push({
                equipmentName: this.selectedEquipments[i].equipmentName
            });
            this.pNoteStatus = true;
        }
        this.fetchAssignedEquipmentsOfPark();
    }


    /**FETCH EQUIPMENTS */
    fetchEquipments() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchEquipments(input)
            .subscribe(response => {
                this.equipments = response.data;
            });
    }
    /**FETCH ASSIGNED EQUIPMENTS FOR SHOW AND HIDE */
    fetchAssignedEquipmentsOfPark() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('parkId', this.moreDetails.id);
        this._parksService.fetchAssignedEquipments(input)
            .subscribe(response => {
                this.assignedEquipments = response.data;
                console.log(this.assignedEquipments);
                this.pNoteStatus = false;
            })
    }

    /**DELETE AN EQUIPMENT */
    delete(value) {

        if (confirm('Datas related to this equipment will be gone! Are you sure?') === true) {
            const input = new FormData();
            input.append('id', value.id);
            input.append('token', this.authToken);
            console.log(value.id + "and" + this.authToken);

            this._parksService.deleteEquipment(input)
                .subscribe(response => {

                    if (response.response_code == 1) {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });

                        const input1 = new FormData();
                        input1.append('token', this.authToken);
                        input1.append('parkId', this.moreDetails.id);
                        console.log(this.moreDetails.id);
                        this._parksService.fetchAssignedEquipments(input1)
                            .subscribe(response => {

                                if (response.response_code === '1') {
                                    if (response.data == null) {
                                        this.snackMessage = 'No equipment assigned!';
                                        this._snackBar.open(this.snackMessage, 'OKAY', {
                                            duration: 5000,
                                        });
                                        this._dialog1.close();
                                    } else {
                                        this.assignedEquipments = response.data;
                                        this.selectedEquipments = this.assignedEquipments;
                                        const len = this.selectedEquipments.length;
                                        this.newEquipments = [];
                                        this.items = [];
                                        for (let i = 0; i < len; i++) {
                                            this.newEquipments.push(
                                                this.selectedEquipments[i].equipmentId
                                            );
                                            this.items.push({
                                                equipmentName: this.selectedEquipments[i].equipmentName
                                            });
                                            this.pNoteStatus = true;
                                        }
                                        this.pNoteStatus = false;

                                    }
                                } else {
                                    this.snackMessage = response.message;
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                }
                            });
                    } else {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        this.btnLabel = 'Add new Equipment';
                    }
                });
        };
    }

    /**CHNAGE BUTTON STATUS */
    changeBtnStatus() {
        this.btnStatus = true;

    }

    /**ADD NEW EQUIPMENTS*/
    addNew() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        input.append('equipmentId', this.newEquipments);
        input.append('parkId', this.moreDetails.id);
        input.append('token', this.authToken);
        // console.log(this.new);
        this._parksService.updateEquipmentsList(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    const input = new FormData();
                    input.append('token', this.authToken);
                    input.append('parkId', this.moreDetails.id);
                    this._parksService.fetchAssignedEquipments(input)
                        .subscribe(response => {
                            if (response.response_code == '1') {
                                if (response.data == null) {
                                    this.snackMessage = 'No equipment assigned!';
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                    this._dialog1.close();
                                } else {
                                    this.assignedEquipments = response.data;
                                    this.selectedEquipments = this.assignedEquipments;
                                    const len = this.selectedEquipments.length;
                                    this.newEquipments = [];
                                    this.items = [];
                                    for (let i = 0; i < len; i++) {
                                        this.newEquipments.push(
                                            this.selectedEquipments[i].equipmentId
                                        );
                                        this.items.push({
                                            equipmentName: this.selectedEquipments[i].equipmentName
                                        });
                                        this.pNoteStatus = true;
                                    }
                                    this.pNoteStatus = false;
                                }
                            } else {
                                this.snackMessage = response.message;
                                this._snackBar.open(this.snackMessage, 'OKAY', {
                                    duration: 5000,
                                });
                            }
                        });
                    this.btnStatus = false;
                    this.btnLabel = 'Add new Equipment';
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnLabel = 'Add new Equipment';
                }

            })
    }

    addRow(value: any) {
        //this.btnStatus = false;
        // this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        // input.append('equipmentId', this.newEquipments);
        // input.append('parkId', this.moreDetails.id);
        // input.append('token', this.authToken);
        input.append('equipmentId', value.equipmentId);
        input.append('parkId', value.parkId);
        input.append('token', this.authToken);

        console.log(this.newEquipments);
        this._parksService.addDulicateEquipment(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    const input = new FormData();
                    input.append('token', this.authToken);
                    input.append('parkId', value.parkId);
                    this._parksService.fetchAssignedEquipments(input)
                        .subscribe(response => {
                            if (response.response_code == '1') {
                                if (response.data == null) {
                                    this.snackMessage = 'No equipment assigned!';
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                    this._dialog1.close();
                                } else {
                                    this.assignedEquipments = response.data;
                                    this.selectedEquipments = this.assignedEquipments;
                                    const len = this.selectedEquipments.length;
                                    this.newEquipments = [];
                                    this.items = [];
                                    for (let i = 0; i < len; i++) {
                                        this.newEquipments.push(
                                            this.selectedEquipments[i].equipmentId
                                        );
                                        this.items.push({
                                            equipmentName: this.selectedEquipments[i].equipmentName
                                        });
                                        this.pNoteStatus = true;
                                    }
                                    this.pNoteStatus = false;
                                }
                            } else {
                                this.snackMessage = response.message;
                                this._snackBar.open(this.snackMessage, 'OKAY', {
                                    duration: 5000,
                                });
                            }
                        });
                    // this.btnStatus = false;
                    // this.btnLabel = 'Add new Equipments';
                    this.fetchEquipments();

                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    //this.btnLabel = 'Add new Equipments';
                }

            })
    }


    /**TOGGLE NOTIFICATION FOR SELECTED USER */
    toggleNotification(value: any) {
        //this.loadingStatus = true;
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', value.id);
        this._parksService.toggleNotification(input)
            .subscribe(response => {
                //this.loadingStatus = false;
                this.snackMessage = response.message;
                this._snackBar.open(this.snackMessage, 'OKAY', {
                    duration: 5000,
                });
                this.fetchAssignedEquipmentsOfPark();
            })
    }

    /**LABEL EDITING */
    status(value) {
        this.visible = value.id;
    }
    /**UPDATE EQUIPMENT LABEL  */
    updatelabel(value: any) {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', value.equipmentId);
        input.append('equipmentName', value.equipmentName);
        input.append('parkId',value.parkId);
        this.fetchAssignedEquipmentsOfPark();
        this._parksService.equipmentLabelEdit(input)
            .subscribe(response => {
                //this.loadingStatus = false;
                this.snackMessage = response.message;
                this._snackBar.open(this.snackMessage, 'OKAY', {
                    duration: 5000,
                });
                this.visible = '0';
                this.fetchAssignedEquipmentsOfPark();
                this.fetchEquipments();
            })

    }

    /**CLOSE EDIT LABEL OF EQUIPMENT */
    closeupdatelabel() {
        this.visible = '0';
        this.fetchAssignedEquipmentsOfPark();
    }
    /*CLOSE DIALOG*/
    close() {
        this._dialog1.close();
    }
    mfr(value: any) {
        let dialogRef = this._mdDialog1.open(mfrDialog, { disableClose: true });
        dialogRef.componentInstance.mfr = value;
        dialogRef.componentInstance.pid = this.moreDetails.id;
        dialogRef.afterClosed().subscribe(result => {
            const input = new FormData();
            input.append('token', this.authToken);
            input.append('parkId', this.moreDetails.id);
            this._parksService.fetchAssignedEquipments(input)
                .subscribe(response => {
                    if (response.response_code === '1') {
                        if (response.data == null) {
                            this.snackMessage = 'No equipment assigned!';
                            this._snackBar.open(this.snackMessage, 'OKAY', {
                                duration: 5000,
                            });
                            dialogRef.close();
                        } else {
                            this.assignedEquipments = response.data;
                            this.selectedEquipments = this.assignedEquipments;
                            const len = this.selectedEquipments.length;
                            this.newEquipments = [];
                            this.items = [];
                            for (let i = 0; i < len; i++) {
                                this.newEquipments.push(
                                    this.selectedEquipments[i].equipmentId
                                );
                                this.items.push({
                                    equipmentName: this.selectedEquipments[i].equipmentName
                                });
                                this.pNoteStatus = true;
                            }
                            this.pNoteStatus = false;

                        }
                    } else {
                        this.snackMessage = response.message;
                        this._snackBar.open(this.snackMessage, 'OKAY', {
                            duration: 5000,
                        });
                    }
                });
        });
    }

    /**ADD NEW EQUIPMENTS*/
    /* addRow(value: any) {
         if (confirm('Are you sure you want to add same Equipment ?') === true) {
             this.btnStatus = false;
             const input = new FormData();
             input.append('equipmentId', value.equipmentId);
             input.append('parkId', value.parkId);
             input.append('token', this.authToken);
 
             // this._parksService.addDulicateEquipment(input)
             // .subscribe(response => {
             //     if (response.response_code === 1) {
             //         this._snackBar.open(response.message, 'CLOSE', {
             //             duration: 5000,
             //         });
 
             this._parksService.addDulicateEquipment(input)
                 .subscribe(response => {
                     if (response.response_code === 1) {
                         this.snackMessage = response.message;
                         this._snackBar.open(this.snackMessage, 'OKAY', {
                             duration: 5000,
                         });
                         
                     }
                     this.visible = '0';
                     this.fetchAssignedEquipmentsOfPark();
                     this.fetchEquipments();
                 });
         }
     }*/


    /*addRow(value: any) {
        if (confirm('Are you sure you want to add same Equipment ?') === true) {
            this.btnStatus = false;
            const input = new FormData();
            input.append('equipmentId', value.equipmentId);
            input.append('parkId', value.parkId);
            input.append('token', this.authToken);
            console.log(this.newEquipments);
            this._parksService.addDulicateEquipment(input)
                .subscribe(response => {
                    if (response.response_code == 1) {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        const input = new FormData();
                        input.append('token', this.authToken);
                        input.append('parkId', this.moreDetails.id);
                        this._parksService.fetchAssignedEquipments(input)
                            .subscribe(response => {
                                if (response.response_code == '1') {
                                    if (response.data == null) {
                                        this.snackMessage = 'No equipments assigned!';
                                        this._snackBar.open(this.snackMessage, 'OKAY', {
                                            duration: 5000,
                                        });
                                        this._dialog1.close();
                                    } else {
                                        this.assignedEquipments = response.data;
                                        this.selectedEquipments = this.assignedEquipments;
                                        const len = this.selectedEquipments.length;
                                        this.newEquipments = [];
                                        this.items = [];
                                        for (let i = 0; i < len; i++) {
                                            this.newEquipments.push(
                                                this.selectedEquipments[i].equipmentId
                                            );
                                            this.items.push({
                                                equipmentName: this.selectedEquipments[i].equipmentName
                                            });
                                            this.pNoteStatus = true;
                                        }
                                        this.pNoteStatus = false;
                                        //this.fetchAssignedEquipmentsOfPark();
                                        this.visible = '0';
                                        this.fetchAssignedEquipmentsOfPark();
                                        this.fetchEquipments();


                                    }
                                    // this.fetchEquipments();
                                } else {
                                    this.snackMessage = response.message;
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                }
                            });

                        this.btnStatus = true;
                        this.btnLabel = 'Add new Equipments';
                    } else {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        this.btnLabel = 'Add new Equipments';
                    }

                })
        };
    }*/
}
