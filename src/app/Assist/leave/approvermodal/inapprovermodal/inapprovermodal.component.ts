import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";

import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../../../AssistService/notification.service";
import {assistService} from "../../../../AssistService/assist.service";
import {inits, leaverequest , sendLeaverequest} from "../../../../AssistModel/leaverequest";
import {Inapproverstep1Component} from "./steps/inapproverstep1/inapproverstep1.component";

@Component({
  selector: 'app-inapprovermodal',
  templateUrl: './inapprovermodal.component.html',
  styleUrls: ['./inapprovermodal.component.scss']
})
export class InapprovermodalComponent implements OnInit {

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
  id: any;
  deleteModalDp: any;
  sendLeaverequest: sendLeaverequest
  checkNextStage: boolean;
  closeResult: string;
  modalOption: NgbModalOptions = {};
  @ViewChild(Inapproverstep1Component) Inapproverstep1Component: Inapproverstep1Component;
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
      if (this.mode === 'auth') {
        this.checkNextStage = false;
        console.log(this.id)
        const url = '/approveleaves/'+this.id;
        const returnValue = this.aService.callMethod(url, 'auth', '', this.activeModal);
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
