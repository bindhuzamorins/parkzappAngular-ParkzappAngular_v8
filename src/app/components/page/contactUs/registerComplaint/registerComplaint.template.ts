import { ContactUsService } from 'app/components/page/contactUs/contactUs.service';
import { ContactUsComponent } from './../contactUs.component';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './registerComplaint.template.html',
    styleUrls: ['./registerComplaint.template.css'],
    providers: [
        UtilsService,
        ContactUsService
    ]
})
export class RegisterComplaintDialog {
    priority: any;
    image: any;
    subject: any;
    name: any;
    subjects: any;
    complaint: any;
    priorities: any;
    email: any;
    imageFile: any;
    btnStatus = true;
    imageFileStatus = true;
    btnLabel = 'Register complaint';
    private authToken:any = this._utils.fetchAuthtokenTokenString();

    constructor(
        public viewMore: MatDialogRef<RegisterComplaintDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _contactUsService: ContactUsService
    ) {

    }
    /**VALIDATE IMAGE FILE */
    fileEvent(fileInput: any) {
        this.imageFile = fileInput.target.files[0];
        if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
            || this.imageFile.type === 'image/jpg') {
            this.imageFileStatus = true;
        }
        else {
            this._snackBar.open('Please select a valid image file', 'CLOSE', {
                duration: 2000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
    }
    /**REGISTER INQUIRY */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Registering! Please wait...';
        //this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('name', this.name);
        input.append('subject', this.subject);
        input.append('complaint', this.complaint);
        input.append('priority', this.priority);
        input.append('email', this.email);
        input.append('complaint_image', this.imageFile);

        this._contactUsService.sendInquiry(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.viewMore.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Register complaint';
                }
            })
    }
    ngOnInit() {
        this.fetchPriority();
        this.fetchSubject();
    }

    /**FETCH SUBJECT */
    fetchSubject() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._contactUsService.fetchSubject(input)
            .subscribe(response => {
                this.subjects = response.data;
            })
    }

    /**FETCH PRIORITY TABLE */
    fetchPriority() {
        this._contactUsService.fetchPriority()
            .subscribe(response => {
                this.priorities = response
            })
    }


    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }
}