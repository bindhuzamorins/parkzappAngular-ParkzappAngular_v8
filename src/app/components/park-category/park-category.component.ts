import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from './../../app.component';
// import { AppComponent } from 'app/app.component';
import { ParkCategoryService } from './park-category.service';
import { AddParkCategoryDialog } from '../page/parks/add/addCategory/addCategory.template';
import { DeleteParkCategoryComponent } from './delete-park-category/delete-park-category.component';
import { UpdateParkCategoryComponent } from './update-park-category/update-park-category.component';
// import { UpdateParkCategoryComponent } from './update-park-category/update-park-category.component';
@Component({
  selector: 'app-park-category',
  templateUrl: './park-category.component.html',
  styleUrls: ['./park-category.component.css'],

  providers: [
    ParkCategoryService,
    UtilsService
  ]
})
export class ParkCategoryComponent implements OnInit {
  serviceId: any;
  tableDataStatus: boolean = true;
  imageName: any;
  linkSplit: any;
  items: any[];
  categories: any;
  snackMessage: any;
  dataFetchStatus = false;
  authToken: any;
  filterArray: any = { categoryName: '' };

  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent,
    public _categoryService: ParkCategoryService,
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.fetchData();
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
  }
  /**FETCH ALL AREA */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._categoryService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.categories = response.data;
          // console.log(this.categories);
          if (this.categories == null) {
            this.tableDataStatus = false;
          } else {
            this.tableDataStatus = true;
            const len = this.categories.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                categories: response.data[i].categoryName
              });
              // this.linkSplit = this.area[i].cityLogo.split('/');
              // this.imageName = this.linkSplit[2];
              // this.cities[i].imageName = this.imageName;
            }
            console.log(this.items);
          }

        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }

  /**ADD BUTTON */
  add() {
    const add = this._mdDialog.open(AddParkCategoryDialog, { disableClose: true });
    add.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }
  // /**EDIT BUTTON */
  edit(value) {
    const edit = this._mdDialog.open(UpdateParkCategoryComponent, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value) {
    const deleteCity = this._mdDialog.open(DeleteParkCategoryComponent, { disableClose: true });
    deleteCity.componentInstance.moreDetails = value;
    deleteCity.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }

}

