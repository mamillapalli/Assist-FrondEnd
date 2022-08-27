import {Component, Input, OnInit} from '@angular/core';
import {rolesrequest} from "../../../../../AssistModel/rolesrequest";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {assistService} from "../../../../../AssistService/assist.service";

@Component({
  selector: 'app-rolesstep1',
  templateUrl: './rolesstep1.component.html',
  styleUrls: ['./rolesstep1.component.scss']
})
export class Rolesstep1Component implements OnInit {

  @Input('updateParentModel') updateParentModel: (part: Partial<rolesrequest>, isFormValid: boolean ) => void;
  @Input() defaultValues: Partial<rolesrequest>;
  private unsubscribe: Subscription[] = [];
  rolesRequestForm: FormGroup;
  @Input() mode: any;
  @Input('formValue') formValue :  any;
  ReadOnlyCheckBox: boolean;

  constructor(private fb: FormBuilder,public aService: assistService) {}

  ngOnInit() {
    this.initForm();
    if(this.mode !== 'new')
    {
      this.updateForm();
      if(this.mode === 'auth' || this.mode === 'delete' || this.mode === 'view')
      {
        this.rolesRequestForm.disable()
        this.ReadOnlyCheckBox = true;
      }
    }
    this.updateParentModel({}, this.checkForm());
  }

  get f() {
    return this.rolesRequestForm.controls;
  }

  updateForm()
  {
    this.rolesRequestForm.patchValue(this.formValue)
  }

  initForm() {
    this.rolesRequestForm = this.fb.group({
      name: [this.defaultValues.name, [Validators.required]],
    });

    const formChangesSubscr = this.rolesRequestForm.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  isControlValid(controlName: string): boolean {
    const control = this.rolesRequestForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.rolesRequestForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.rolesRequestForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    return false;
  }

  checkForm() {
    return !(
      this.rolesRequestForm.get('name')?.hasError('required')
    );
  }

}
