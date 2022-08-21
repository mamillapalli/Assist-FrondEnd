import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {leaverequest} from "../../../AssistModel/leaverequest";
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {CustomColumn} from "../../../AssistModel/CustomColumn";
import {filterCondition} from "../../../AssistModel/filterCondition";
import {filterFunction} from "../../../AssistModel/filterFunction";
import {AuthService} from "../../../modules/auth";
import {NotificationService} from "../../../AssistService/notification.service";
import {assistService} from "../../../AssistService/assist.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {InapprovermodalComponent} from "./inapprovermodal/inapprovermodal.component";

@Component({
  selector: 'app-approvermodal',
  templateUrl: './approvermodal.component.html',
  styleUrls: ['./approvermodal.component.scss']
})
export class ApprovermodalComponent implements OnInit {
  dataSource: any = new MatTableDataSource<leaverequest>();
  @Output() displayedColumns:  string[] = ['columnSetting','id', 'name', 'startDate', 'endDate', 'status', 'approverComments', 'actions'];
  @Output() fDisplayedColumns: string[] = ['customerId','id', 'name', 'startDate', 'endDate', 'status','approverComments'];
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
  closeResult: any ;
  modalHeader: any;

  constructor(public authService: AuthService,
              public modalService: NgbModal,
              public notifyService: NotificationService,
              public aService: assistService,
              public activeModal: NgbActiveModal) {
    const auth = this.authService.getAuthFromLocalStorage();
    this.authRoles = auth?.roles;
  }

  ngOnInit(): void {
    this.columns = [
      { columnDef: 'id', header: 'Id' },
      { columnDef: 'name', header: 'Name' },
      { columnDef: 'startDate', header: 'StartDate' },
      { columnDef: 'endDate', header: 'End Date' },
      { columnDef: 'approverComments', header: 'Approver Comments' },
      { columnDef: 'status', header: 'Status' },
    ]
    this.aService.initializeColumnProperties(this.displayedColumns,this.columnShowHideList);
    this.getLeaveByApprover();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getLeaveByApprover() {
    const sb = this.aService.getMethod('/leavesByApproverId/77777/WAITING', '',).subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.subscriptions.push(sb);
  }

  openFilter() {

  }

  drop(event: CdkDragDrop<string[]>) {
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getLeaveByApprover();
  }

  sortChanges(event: Sort) {
    this.sortData = event.active+','+event.direction
    this.getLeaveByApprover();
  }

  public applyFilter(event: any,label:any) {
  }

  clearColumn(event:any,columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilter(null,null);
    this.getLeaveByApprover();
  }

  openCorporatesDialog(element: any, view: string) {
  }

  openDeleteCustomer(element: any, view: string){
  }


  toggleColumn(column:any) {

  }

  openDialog(element: any, mode: any) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl'
    const modalRef = this.modalService.open(InapprovermodalComponent, this.modalOption);
    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.fromParent = element;
    modalRef.componentInstance.displayedColumns = this.displayedColumns;
    modalRef.componentInstance.fDisplayedColumns = this.fDisplayedColumns;
    modalRef.result.then((result) => {
      this.getLeaveByApprover();
    }, (reason) => {
      this.getLeaveByApprover();
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

  openSuperAdminDelete(deleteContent:any, element:any) {
  }

  openPendingAction() {

  }

  openSuperAdminDialog(element: any, mode: any) {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'xl'
    const modalRef = this.modalService.open(InapprovermodalComponent, this.modalOption);
    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.fromParent = element;
    modalRef.componentInstance.displayedColumns = this.displayedColumns;
    modalRef.componentInstance.fDisplayedColumns = this.fDisplayedColumns;
    modalRef.componentInstance.id = element.id;
    modalRef.result.then((result) => {
      this.getLeaveByApprover();
    }, (reason) => {
      this.getLeaveByApprover();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close(){
    this.activeModal.dismiss();
  }
}
