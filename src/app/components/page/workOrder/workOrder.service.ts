import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WorkOrderService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

       /**FETCH EMAIL DETAILS*/
       fetchData(data: any) {
        this.filePath = 'emails/fetchEmails.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** GENERATE INSPECTION REPORT */
    generate(data: any) {
        this.filePath = 'report/workOrder/generateWorkOrder.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** FETCH FINISHED WORK ORDER */
    fetchFinishedOrder(data: any) {
        this.filePath = 'report/workOrder/finishedWorkOrderList.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** PRINT WORK ORDER */
    print(data: any) {
        this.filePath = 'report/workOrder/finishedWorkOrderhtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** FETCH FINISHED WORK ORDER */
    fetchPendingOrder(data: any) {
        this.filePath = 'report/workOrder/pendingWorkOrderList.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** SUBMIT PENDING WORK ORDER */
    submit(data: any) {
        this.filePath = 'report/workOrder/submitPendingWorkOrder.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }


   /** UPDATE NOTES FROM PENDING WORK ORDER */
   updateNote(data: any) {
    this.filePath = 'report/workOrder/updateNote.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

  /** REASSIGN FROM PENDING WORK ORDER */
  reAssign(data: any) {
    this.filePath = 'report/workOrder/reassignWorkOrder.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}




}