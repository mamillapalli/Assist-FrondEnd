import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {inits, leaverequest, sendLeaverequest} from "../../../AssistModel/leaverequest";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../AssistService/notification.service";
import {HttpClient} from "@angular/common/http";
import {Leavestep1Component} from "./steps/leavestep1/leavestep1.component";
import {assistService} from "../../../AssistService/assist.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-leavemodal',
  templateUrl: './leavemodal.component.html',
  styleUrls: ['./leavemodal.component.scss']
})
export class LeavemodalComponent implements OnInit {
  formsCount = 1;
  account$: BehaviorSubject < any >  =
    new BehaviorSubject < leaverequest > (inits);
  currentStep$: BehaviorSubject < number >  = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject < boolean >  = new BehaviorSubject < boolean > (
    false);
  errorMsg: string;
  private unsubscribe: Subscription[] = [];
  @Input()mode: any;
  @Output()formValue: any
  fromParent: any;
  deleteModalDp: any;
  sendLeaverequest: sendLeaverequest
  checkNextStage: boolean;
  closeResult: string;
  modalOption: NgbModalOptions = {};
  @ViewChild(Leavestep1Component)leavestep1Component: Leavestep1Component;
  @Output()displayedColumns: any
  @Output()fDisplayedColumns: any
  modal: any;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              public activeModal: NgbActiveModal,
              public notifyService: NotificationService,
              public modalService: NgbModal, public aService: assistService) {}

  ngOnInit(): void {
    if (this.mode !== 'new') {
      this.formValue = this.fromParent;
    }
  }

  updateAccount = (part: Partial < leaverequest > , isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = {
      ...currentAccount,
      ...part
    };
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    console.log('check validation')
    const nextStep = this.currentStep$.value;
    if (nextStep > this.formsCount) {
      return;
    }
    if (this.currentStep$.value === this.formsCount) {
      console.log(this.account$.value)
      this.sendLeaverequest = new sendLeaverequest(this.account$.value);
      if (this.mode === 'new') {
        this.checkNextStage = false;
        const url = '/leaves';
        const returnValue = this.aService.callMethod(url, 'new', this.sendLeaverequest, this.activeModal);
        if (returnValue === "success") {
          this.currentStep$.next(nextStep);
          this.activeModal.close();
        }
      } else {
        this.activeModal.close();
      }
    }
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  closeModal() {
    this.activeModal.dismiss();
  }

}
