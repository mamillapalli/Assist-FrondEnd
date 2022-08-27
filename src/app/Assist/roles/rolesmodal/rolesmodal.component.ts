import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {inits,rolesrequest,sendrolesrequest} from "../../../AssistModel/rolesrequest";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Leavestep1Component} from "../../leave/leavemodal/steps/leavestep1/leavestep1.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../../AssistService/notification.service";
import {assistService} from "../../../AssistService/assist.service";
import {Rolesstep1Component} from "./steps/rolesstep1/rolesstep1.component";

@Component({
  selector: 'app-rolesmodal',
  templateUrl: './rolesmodal.component.html',
  styleUrls: ['./rolesmodal.component.scss']
})
export class RolesmodalComponent implements OnInit {

  formsCount = 1;
  account$: BehaviorSubject < any >  =
    new BehaviorSubject < rolesrequest > (inits);
  currentStep$: BehaviorSubject < number >  = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject < boolean >  = new BehaviorSubject < boolean > (
    false);
  errorMsg: string;
  private unsubscribe: Subscription[] = [];
  @Input()mode: any;
  @Output()formValue: any
  fromParent: any;
  deleteModalDp: any;
  sendrolesrequest: sendrolesrequest
  checkNextStage: boolean;
  closeResult: string;
  modalOption: NgbModalOptions = {};
  @ViewChild(Rolesstep1Component)rolesstep1Component: Rolesstep1Component;
  @Output()displayedColumns: any
  @Output()fDisplayedColumns: any
  modal: any;
  id:any;


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

  updateAccount = (part: Partial < rolesrequest > , isFormValid: boolean) => {
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
      this.sendrolesrequest = new sendrolesrequest(this.account$.value);
      if (this.mode === 'new') {
        this.checkNextStage = false;
        const url = '/assistadmin/roles';
        const returnValue = this.aService.callMethod(url, 'new', this.sendrolesrequest, this.activeModal);
        if (returnValue === "success") {
          this.currentStep$.next(nextStep);
          this.activeModal.close();
        }
      } else if (this.mode === 'edit') {
        this.checkNextStage = false;
        const url = '/assistadmin/roles/'+this.account$.value.roles_id;
        const returnValue = this.aService.callMethod(url, 'edit', this.sendrolesrequest, this.activeModal);
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
