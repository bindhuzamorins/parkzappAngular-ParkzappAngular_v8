import { PlanListService } from './../planList.service';
import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './customPayment.template.html',
    styleUrls: ['./customPayment.template.css'],
    providers: [
        PlanListService,
        UtilsService
    ]
})
export class CustomPaymentDialog implements OnInit {
    enCodedValue: string;
    enCode: string;
    firstname:any;
    lastname:any;
    stripeReturn: any;
    payAmount: number;
    amount: any;
    email: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Pay the amount';
    constructor(
        public _dialog: MatDialogRef<CustomPaymentDialog>,
        private _snackBar: MatSnackBar,
        private _planListService: PlanListService,
        private _utils: UtilsService

    ) {

    }

    ngOnInit(): void {

    }

    /**PAY AMOUNT ENTERED */
    pay(value: any) {
        // console.log(value);
        this.enCode = value.firstname + '@#$' + value.lastname + '@#$' + value.email + '@#$' + value.amount;
        // console.log(this.enCode);
        this.enCodedValue = btoa(this.enCode);
        // console.log(btoa(this.enCodedValue));
        window.open(this._utils.defaultUrl + 'registration/pay.php?id=' + this.enCodedValue, "_blank");
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}