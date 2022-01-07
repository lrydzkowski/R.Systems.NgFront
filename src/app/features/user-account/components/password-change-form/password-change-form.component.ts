import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChangeRequest } from '@features/user-account/api/models/password-change-request';
import { UserAccountApiService } from '@features/user-account/api/services/user-account-api.service';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'user-account-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    currentPassword: ['', []],
    newPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.minLength(this.newPasswordMinLength)(control),
      (control: AbstractControl) => Validators.maxLength(this.newPasswordMaxLength)(control)
    ]],
    repeatedNewPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.minLength(this.newPasswordMinLength)(control),
      (control: AbstractControl) => Validators.maxLength(this.newPasswordMaxLength)(control)
    ]]
  });

  isProcessing = false;

  newPasswordMinLength = 6;

  newPasswordMaxLength = 30;

  constructor(
    public formHandler: FormHandlerService,
    private formBuilder: FormBuilder,
    private toastMessageService: ToastMessageService,
    private userAccountApi: UserAccountApiService) { }

  ngOnInit(): void { }

  submit(): void {
    if (this.isProcessing) {
      return;
    }
    if (!this.formHandler.isFormValid(this.form)) {
      return;
    }
    const formData: PasswordChangeRequest = this.formHandler.getFieldValues<PasswordChangeRequest>(this.form);
    this.isProcessing = true;
    this.userAccountApi.changePassword(formData)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe({
        next: () => {
          this.toastMessageService.showConfirmationMessage($localize`Your password has been changed.`);
          this.clearFormValues();
        },
        error: (error: HttpErrorResponse) => {
          this.handleChangePasswordError(error);
        }
      });
  }

  private clearFormValues(): void {
    this.form.reset();
  }

  private handleChangePasswordError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 400:
        const debug = true;
        break;
      case 504:
        this.toastMessageService.showConnectionErrorMessage();
        break;
      default:
        this.toastMessageService.showUnexpectedErrorMessage();
        break;
    }
  }
}
