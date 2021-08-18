import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';

@Component({
  selector: 'user-auth-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {

  private passwordMaxLength: number = 40;

  form: FormGroup = this.formBuilder.group({
    currentPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)]
    ],
    newPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)]
    ],
    newPasswordRepetition: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)
    ]]
  });

  constructor(
    private formBuilder: FormBuilder,
    public formHandler: FormHandlerService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.formHandler.isFormValid(this.form)) {
      return;
    }
    const fieldValues: object = this.formHandler.getFieldValues(this.form);
    console.log('submit');
    console.log(fieldValues);
  }
}
