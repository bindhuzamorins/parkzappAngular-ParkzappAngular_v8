import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RecurrenceService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;


    constructor(
        private _http: HttpClient,
        private _utils: UtilsService

    ) { }

    /* FETCH ALL RECURRENCE */
    fetchAllRecurrence(data: any) {
        this.filePath = 'recurrence/fetchRecurrence.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** ADD RECURRENCE */
    addData(data: any) {
        this.filePath = 'recurrence/addRecurrence.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** DELETE RECURRENCE */
    deleteData(data: any) {
        this.filePath = 'recurrence/deleteRecurrence.php';
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** EDIT RECURRENCE */
    editData(data: any) {
        this.filePath = 'recurrence/updateRecurrence.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
}