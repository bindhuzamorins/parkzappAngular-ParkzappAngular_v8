import { Nl2BrPipeModule } from 'nl2br-pipe';
//import { QuestionSetComponent } from './components/page/customizedQuestion/QuestionSet/QuestionSet.component';
import { pipesDeclarations } from './app-pipes.module';
import { templateDeclaration, templateEntry } from './app-templates.module';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClient} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';
import { materialImports } from 'app/app-material.module';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2PaginationModule } from 'ng2-pagination';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AgmCoreModule } from '@agm/core';

import { TextMaskModule } from 'angular2-text-mask';
import { CustomFormsModule } from 'ng2-validation'
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ExpansionPanelsModule } from 'ng2-expansion-panels';
import { Ng4FilesModule } from 'angular4-files-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { MatAutocomplete } from '@angular/material/autocomplete';
// import { ParkAreaComponent } from './park-area/park-area.component';
import {HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    templateDeclaration,
    pipesDeclarations,
    // MdAutocomplete
    // ParkAreaComponent,

  ],
  imports: [
    Ng4FilesModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    materialImports,
    Ng2FilterPipeModule,
    Ng2PaginationModule,
    NguiAutoCompleteModule,
    ExpansionPanelsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUO5Kg5i9s_4O6jfnT7S93xm0HWd6ArGI'
    }),
    ReactiveFormsModule,
    TextMaskModule,
    CustomFormsModule,
    ImageCropperModule,
    Nl2BrPipeModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    // MdAutocomplete
  ],
  entryComponents: [
    templateEntry
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MyModule { }