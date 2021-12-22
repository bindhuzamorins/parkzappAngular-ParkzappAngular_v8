import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UtilsService } from './../../../../utils.service';
import 'rxjs/add/operator/map';


@Injectable()
export class InspectionRequestService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;



    constructor(
        private _utils: UtilsService,
        private _http: HttpClient
    ) { }

    /**FETCH ALL INSPECTION REQUESTS */
    fetchInspectionRequest(data: any) {
        this.filePath = 'report/inspection/inspectionRequest.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** APPROVE INSPECTION REQUEST */
    requestApprove(data: any) {
        this.filePath = 'report/inspection/approveInspectionRequest.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** DECLINE INSPECTION REQUEST */
    requestDecline(data: any) {
        this.filePath = 'report/inspection/declineInspectionRequest.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
     /** search INSPECTION REQUEST */
     search(data: any) {
        this.filePath = 'report/inspection/inspectionRequestsearch.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

}