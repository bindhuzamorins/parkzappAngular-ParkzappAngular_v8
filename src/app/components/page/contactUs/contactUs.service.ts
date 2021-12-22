import { Injectable } from '@angular/core';
import { UtilsService } from './../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactUsService {
    filePath: any;
    public defaultUrl = this._utils.defaultUrl;
    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }


    /**SEND USER QUERIES*/
    sendData(data: any) {
        this.filePath = 'contactUs/contact.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**SEND USER INQUERIES TO SUPPORT DB*/
    sendInquiry(data: any) {
        this.filePath = 'complaintRegister/registerComplaint.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH PRIORITY */
    fetchPriority() {
        return this._http
            .get('assets/json/priorityList.json')
            .map((response: any) => response);
    }

    /**FETCH SUBJECT */
    fetchSubject(data: any) {
        this.filePath = 'complaintRegister/fetchSubjects.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
}