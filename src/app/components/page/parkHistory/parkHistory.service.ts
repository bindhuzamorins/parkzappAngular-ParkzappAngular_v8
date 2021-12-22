import { Injectable } from '@angular/core';
import { UtilsService } from './../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ParkHistoryService {
    filePath: any;
    public defaultUrl = this._utils.defaultUrl;
    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }
    /**FETCH PARK HISTORY*/
    fetchParkHistory(data: any) {
        this.filePath = 'report/parkHistory/listParkHistory.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH PARK HISTORY*/
    downloadParkhistory(data: any) {
        this.filePath = 'report/parkHistory/downloadhtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH PARK HISTORY*/
    historyDetails(data: any) {
        // this.filePath = 'report/parkHistory/historyDetails.php';
        this.filePath = 'report/inspection/inspectionReportDetails.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    print(data: any) {
        // this.filePath = 'report/parkHistory/downloadhtml.php';
        this.filePath = 'report/inspection/inspectionReporthtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    send(data: any) {
        this.filePath = 'report/inspection/inspectionReportMail.php';
        // this.filePath = 'report/parkHistory/downloadpdf.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);

    }

}