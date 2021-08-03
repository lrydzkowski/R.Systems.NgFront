import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';
import { LoginRequest } from '../../api/models/login-request';
import { UserAuthApiService } from '../../api/services/user-auth-api.service';
import { finalize } from 'rxjs/operators';
import { TokenInfo } from '../../models/token-info';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    login: ['', [
      Validators.required
    ]],
    password: ['', [
      Validators.required
    ]]
  });

  isProcessing: boolean = false;

  constructor(
    public formHandler: FormHandlerService,
    private formBuilder: FormBuilder,
    private userAuthApi: UserAuthApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formHandler.setFormGroup(this.form);
  }

  submit(): void {
    if (this.isProcessing) {
      return;
    }
    if (!this.formHandler.isFormValid()) {
      return;
    }
    this.isProcessing = true;
    const formData: LoginRequest = this.formHandler.getFieldValues() as LoginRequest;
    this.userAuthApi.login(formData)
      .pipe(finalize(() => this.isProcessing = false))
      .subscribe({
        next: (tokenInfo: TokenInfo) => {
          this.userService.login(tokenInfo);
        },
        error: (error: HttpErrorResponse) => {

        }
      });
  }

}
