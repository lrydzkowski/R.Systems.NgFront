import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';
import { AuthenticateRequest } from '../../api/models/authenticate-request';
import { UserAuthApiService } from '../../api/services/user-auth-api.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AuthenticateResponse } from '@features/user-auth/api/models/authenticate-response';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';
import { ErrorInfo } from '@shared/shared/validation/error-info';
import { StringUtilsService } from '@shared/shared/services/string-utils.service';

@Component({
  selector: 'user-auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('emailInput') emailInput!: ElementRef;

  form: FormGroup = this.formBuilder.group({
    email: ['', [
      Validators.required
    ]],
    password: ['', []]
  });

  isProcessing = false;

  constructor(
    public formHandler: FormHandlerService,
    private formBuilder: FormBuilder,
    private userAuthApi: UserAuthApiService,
    private userService: UserService,
    private toastMessageService: ToastMessageService,
    private stringUtils: StringUtilsService) { }

  ngOnInit(): void { }

  submit(): void {
    if (this.isProcessing) {
      return;
    }
    this.formHandler.isFormValid(this.form);
    const formData: AuthenticateRequest = this.formHandler.getFieldValues<AuthenticateRequest>(this.form);
    if (formData.email === null) {
      return;
    }
    this.isProcessing = true;
    this.userAuthApi.authenticate(formData)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe({
        next: (response: AuthenticateResponse) => {
          this.userService.login({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
        },
        error: (error: HttpErrorResponse) => {
          this.handleAuthenticateError(error);
        }
      });
  }

  private handleAuthenticateError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      this.formHandler.triggerErrorOnField(this.form, 'email', 'wrongData', true);
      this.setFocusOnEmailField();
      return;
    }
    if (error.status === 400) {
      const validationErrors = error.error as ErrorInfo[];
      let found = false;
      for (const validationError of validationErrors) {
        if (validationError.elementKey !== 'User') {
          continue;
        }
        found = true;
        this.formHandler.triggerErrorOnField(
          this.form,
          'email',
          this.stringUtils.makeFirstLetterSmall(validationError.errorKey),
          true
        );
      }
      if (found) {
        return;
      }
    }
    this.toastMessageService.showUnexpectedErrorMessage();
  }

  private setFocusOnEmailField(): void {
    if (this.emailInput === null) {
      return;
    }
    this.emailInput.nativeElement.focus();
  }
}
