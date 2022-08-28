import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {addresource} from "../../AssistModel/addresource";
import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {CustomColumn} from "../../AssistModel/CustomColumn";
import {filterCondition} from "../../AssistModel/filterCondition";
import {filterFunction} from "../../AssistModel/filterFunction";
import {AuthService} from "../../modules/auth";
import {NotificationService} from "../../AssistService/notification.service";
import {assistService} from "../../AssistService/assist.service";
import {ResourcemodelComponent} from "../add-resource/resourcemodel/resourcemodel.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FilterComponentComponent} from "../ExternalModal/filter-component/filter-component.component";
import {commonService} from "../../AssistService/common.service";


@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit, AfterViewInit {
  dataSource: any = new MatTableDataSource<addresource>();
  @Output() displayedColumns: string[] = ['columnSetting', 'firstName', 'lastName', 'birthDate', 'joiningDate', 'status', 'emailAddress', 'reportingTo', 'actions'];
  @Output() fDisplayedColumns: string[] = ['customerId', 'firstName', 'lastName', 'birthDate', 'joiningDate', 'status', 'emailAddress', 'reportingTo'];
  modalOption: NgbModalOptions = {};
  private subscriptions: Subscription[] = [];
  authRoles: any;


  //SORTING
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  sortData: any

  //filter
  public columnShowHideList: CustomColumn[] = []
  color = 'accent';
  public conditionsList = filterCondition;
  public searchValue: any = {};
  public searchLabel: any = {};
  public searchCondition: any = {};
  private _filterMethods = filterFunction;
  searchFilter: any = {};
  columns: { columnDef: string; header: string; }[];
  closeResult: any;

  constructor(public authService: AuthService, public modalService: NgbModal,
              public notifyService: NotificationService, public aService: assistService,
              public commonService: commonService) {
    const auth = this.authService.getAuthFromLocalStorage();
    this.authRoles = auth?.roles;
  }

  ngOnInit(): void {
    this.columns = [
      {columnDef: 'name', header: 'Name'},
      {columnDef: 'firstName', header: 'FirstName'},
      {columnDef: 'lastName', header: 'LastName'},
      {columnDef: 'birthDate', header: 'Date of Birth'},
      {columnDef: 'joiningDate', header: 'Joining Date'},
      {columnDef: 'emailAddress', header: 'Email Address'},
      {columnDef: 'reportingTo', header: 'Reporting To'},
      {columnDef: 'status', header: 'Status'},
    ]
    this.aService.initializeColumnProperties(this.displayedColumns, this.columnShowHideList);
    this.getResources();
    this.dataSource.filterPredicate = this.commonService.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getResources() {
    const sb = this.aService.getMethod('/assistadmin/resources', '',).subscribe((res) => {
      console.log("res is " + res)
      console.log("response is :" + res)
      this.dataSource.data = res;
      //this.totalRows = res
    });
    this.subscriptions.push(sb);
  }

  AddResource() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl'
    const modalRef = this.modalService.open(ResourcemodelComponent, this.modalOption);
    modalRef.componentInstance.mode = 'new';
    modalRef.componentInstance.displayedColumns = this.displayedColumns;
    modalRef.componentInstance.fDsplayedColumns = this.fDisplayedColumns;
    modalRef.result.then((result) => {
      console.log('newSuperAdmin is ' + result);
      this.getResources();
    }, (reason) => {
      this.getResources();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDialog(element: any, mode: any) {
    console.log(element)
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl'
    const modalRef = this.modalService.open(ResourcemodelComponent, this.modalOption);
    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.fromParent = element;
    modalRef.componentInstance.displayedColumns = this.displayedColumns;
    modalRef.componentInstance.fDisplayedColumns = this.fDisplayedColumns;
    modalRef.result.then((result) => {
      this.getResources();
    }, (reason) => {
      this.getResources();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openSuperAdminDelete(deleteContent: any, element: any) {
    this.modalService.open(element, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      const url = '/assistadmin/resource/' + element.roles_id;
      if (result === 'yes') {
        //const returnValue = this.aService.callMethod(url, 'delete','',this.activeModal);
        this.getResources();
      }
    }, (reason) => {
      this.getResources();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openFilter() {
    console.log('open filter')
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';
    const modalRef = this.modalService.open(FilterComponentComponent, this.modalOption);
    console.log(this.fDisplayedColumns)
    modalRef.componentInstance.fDisplayedColumns = this.fDisplayedColumns;
    modalRef.result.then((result) => {
      console.log(result);
      if (result.valid && result.value.filterOption.length > 0) {
        const f = result.value.filterOption
        for (let i = 0; i < f.length; i++) {
          let filterValues: any = {};
          filterValues[f[i].filterId] = f[i].filterValue
          this.dataSource.filter = JSON.stringify(filterValues);
        }
      } else if (result == 'reset') {
        this.dataSource.filter = "";
      } else {
        console.log('No Records')
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  applyFilter(event: any, label: any) {
    this.dataSource.filter = '';
    this.searchFilter = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this._filterMethods,
      label: label,
    };
    this.commonService.applyFilter(this.searchFilter, this.dataSource)
  }

  clearColumn(event: any, columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.commonService.clearColumn(columnKey, this.dataSource)
  }

  toggleColumn(column: any) {
    if (column.isActive && column.name !== 'columnSetting') {
      if (column.possition > this.displayedColumns.length - 1) {
        this.displayedColumns.push(column.name);
      } else {
        this.displayedColumns.splice(column.possition, 0, column.name);
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getResources();
  }

  sortChanges(event: Sort) {
    this.sortData = event.active + ',' + event.direction
    this.getResources();
  }

}
