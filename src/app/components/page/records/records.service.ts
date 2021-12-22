import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecordsService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;
    
    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**FETCH RECORDS*/
    fetchData(data: any) {
        this.filePath = 'records/fetchRecord.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**FETCH RECORDS*/
    fetchParks(data: any) {
        this.filePath = 'park/listAllParks.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**ADD RECORDS*/
    addData(data: any) {
        this.filePath = 'records/addRecord.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**DELETE RECORDS*/
    deleteData(data: any) {
        this.filePath = 'records/deleteRecord.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

}