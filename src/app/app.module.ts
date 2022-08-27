import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
//
import { DataTablesModule } from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {NgSelectModule} from "@ng-select/ng-select";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxSpinnerModule} from "ngx-spinner";
import {CdkTableExporterModule, MatTableExporterModule} from "mat-table-exporter";
import {ToastrModule} from "ngx-toastr";
import {NgxCurrencyModule} from "ngx-currency";
import {NgChartsModule} from "ng2-charts";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {LazyLoadImageModule} from "ng-lazyload-image";
import { LeaveComponent } from './Assist/leave/leave.component';
import { LeavemodalComponent } from './Assist/leave/leavemodal/leavemodal.component';
import { Leavestep1Component } from './Assist/leave/leavemodal/steps/leavestep1/leavestep1.component';
import { LeaveApproverComponent } from './Assist/leave-approver/leave-approver.component';
import { ApprovermodalComponent } from './Assist/leave/approvermodal/approvermodal.component';
import { InapprovermodalComponent } from './Assist/leave/approvermodal/inapprovermodal/inapprovermodal.component';
import { Inapproverstep1Component } from './Assist/leave/approvermodal/inapprovermodal/steps/inapproverstep1/inapproverstep1.component';
import { RolesComponent } from './Assist/roles/roles.component';
import { RolesmodalComponent } from './Assist/roles/rolesmodal/rolesmodal.component';
import { Rolesstep1Component } from './Assist/roles/rolesmodal/steps/rolesstep1/rolesstep1.component';
import {AddResourceComponent} from "./Assist/add-resource/add-resource.component";
import {Resourcestep1Component} from "./Assist/add-resource/resourcemodel/steps/resourcestep1/resourcestep1.component";
import {ResourcemodelComponent} from "./Assist/add-resource/resourcemodel/resourcemodel.component";
import { ExternalResourceToComponentComponent } from './Assist/ExternalModal/external-resource-to-component/external-resource-to-component.component';


function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent,
    LeaveComponent,
    LeavemodalComponent,
    Leavestep1Component,
    LeaveApproverComponent,
    ApprovermodalComponent,
    InapprovermodalComponent,
    Inapproverstep1Component,
    RolesComponent,
    RolesmodalComponent,
    Rolesstep1Component,
    AddResourceComponent,
    Resourcestep1Component,
    ResourcemodelComponent,
    ExternalResourceToComponentComponent
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
    LazyLoadImageModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
