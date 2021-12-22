import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './stripePayment.template.html',
    styleUrls: ['./stripePayment.template.css'],
    providers: [
        UtilsService
    ]
})
export class StripePaymentDialog {
    imageUrl: string;
    moreDetails: string;
    constructor(
        public _dialog: MatDialogRef<StripePaymentDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;

    message: string;

    getToken() {
        this.message = 'Loading...';

        (<any>window).Stripe.card.createToken({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        }, (status: number, response: any) => {
            console.log(response);
            if (status === 200) {
                this.message = `Success! Card token ${response.card.id}.`;
            } else {
                this.message = response.error.message;
            }
        });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}