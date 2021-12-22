import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CityService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**FETCH CITY DETAILS*/
    fetchData(data: any) {
        this.filePath = 'city/fetchAllCity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**FETCH USA STATES*/
    fetchUSAStates() {
        return this._http
            .get('assets/json/USAstates.json')
            .map((response: any) => response);
    }

    /**ADD CITY DETAILS*/
    addData(data: any) {
        this.filePath = 'city/addCity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**EDIT CITY DETAILS*/
    editData(data: any) {
        this.filePath = 'city/updateCity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }


    /**DELETE CITY DETAILS*/
    deleteData(data: any) {
        this.filePath = 'city/deleteCity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
      /**FETCH SELECTED COUNTRIES*/
      fetchSelectedCountries() {
        return this._http
            .get('assets/json/selectedCountries.json')
            .map((response: any) => response);
    }

    /**FETCH STATES*/
    fetchStates(value: any) {
        return this._http
            .get('assets/json/states/' + value + '.json')
            .map((response: any) => response);
    }
     /**FETCH TIMEZONE*/
     fetchtimezone(value: any) {
        return this._http
            .get('assets/json/timezone.json')
            .map((response: any) => response);
    }
}