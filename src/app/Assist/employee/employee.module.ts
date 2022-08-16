import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DropdownMenusModule, WidgetsModule } from '../../_metronic/partials';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {ClipboardModule} from "ngx-clipboard";
import {AppRoutingModule} from "../../app-routing.module";
import {DataTablesModule} from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ToastrModule} from "ngx-toastr";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerModule} from "ngx-spinner";
import {CdkTableExporterModule, MatTableExporterModule} from "mat-table-exporter";
import {NgxCurrencyModule} from "ngx-currency";
import {NgChartsModule} from "ng2-charts";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [
    LeaverequestComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatAutocompleteModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    MatTableExporterModule,
    CdkTableExporterModule,
    NgxCurrencyModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgChartsModule,
    NgxMatSelectSearchModule,
    AngularMultiSelectModule,
  ],
})
export class EmployeeModule {}
