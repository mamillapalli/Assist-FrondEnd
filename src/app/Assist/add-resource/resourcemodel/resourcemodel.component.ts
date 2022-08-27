import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {inits, addresource,addResourcerequest} from "../../../AssistModel/addresource";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Resourcestep1Component} from "../../add-resource/resourcemodel/steps/resourcestep1/resourcestep1.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../../AssistService/notification.service";
import {assistService} from "../../../AssistService/assist.service";

@Component({
  selector: 'app-resourcemodel',
  templateUrl: './resourcemodel.component.html',
  styleUrls: ['./resourcemodel.component.scss']
})
export class ResourcemodelComponent implements OnInit {
  formsCount = 1;
  account$: BehaviorSubject < any >  =
    new BehaviorSubject < addresource > (inits);
  currentStep$: BehaviorSubject < number >  = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject < boolean >  = new BehaviorSubject < boolean > (
    false);
  errorMsg: string;
  private unsubscribe: Subscription[] = [];
  @Input()mode: any;
  @Output()formValue: any
  fromParent: any;
  deleteModalDp: any;
  addResourcerequest: addResourcerequest
  checkNextStage: boolean;
  closeResult: string;
  modalOption: NgbModalOptions = {};
  @ViewChild(Resourcestep1Component)Resourcestep1Component: Resourcestep1Component;
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

  updateAccount = (part: Partial < addresource > , isFormValid: boolean) => {
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
      this.addResourcerequest = new addResourcerequest(this.account$.value);
      if (this.mode === 'new') {
        this.checkNextStage = false;
        const url = 'assistadmin/resources';
        const returnValue = this.aService.callMethod(url, 'new', this.addResourcerequest, this.activeModal);
        if (returnValue === "success") {
          this.currentStep$.next(nextStep);
          this.activeModal.close();
        }
      } else if (this.mode === 'edit') {
        this.checkNextStage = false;
        const url = 'assistadmin/resources';
        const returnValue = this.aService.callMethod(url, 'edit', this.addResourcerequest, this.activeModal);
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
