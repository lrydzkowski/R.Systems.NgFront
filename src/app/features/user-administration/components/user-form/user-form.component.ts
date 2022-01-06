import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@features/user-administration/models/user';
import { FieldsLengths } from '@shared/shared/models/fields-lengths';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';

@Component({
  selector: 'user-admin-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usersListLink: string = $localize`/administration/users`;

  userId = 0;

  formHeader = '';

  lengths: FieldsLengths = {
    login: { max: 100 },
    email: { max: 100 },
    firstName: { max: 100 },
    lastName: { max: 100 }
  };

  form: FormGroup = this.formBuilder.group({
    login: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.lengths.login.max)(control)]
    ],
    email: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.lengths.email.max)(control)]
    ],
    firstName: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.lengths.firstName.max)(control)
    ]],
    lastName: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.lengths.lastName.max)(control)
    ]]
  });

  private newUserFormHeader = $localize`New user`;

  private existingUserFormHeader = $localize`Existing user`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public formHandler: FormHandlerService,
    private toastMessageService: ToastMessageService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.setFormHeader();
  }

  onSubmit(): void {
    if (!this.formHandler.isFormValid(this.form)) {
      return;
    }
    const user: User = this.formHandler.getFieldValues<User>(this.form);
    this.showConfirmationMessage();
    this.redirectToUsersList();
    console.log('submit');
    console.log(user);
  }

  private getUserId(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam === null) {
      return;
    }
    const userId = parseInt(userIdParam, 10);
    if (isNaN(userId) || typeof userId !== 'number') {
      return;
    }
    this.userId = userId;
  }

  private setFormHeader(): void {
    if (this.isNewUser()) {
      this.formHeader = this.newUserFormHeader;
    } else {
      this.formHeader = this.existingUserFormHeader;
    }
  }

  private showConfirmationMessage(): void {
    let msg = '';
    if (this.isNewUser()) {
      msg = $localize`User has been created.`;
    } else {
      msg = $localize`User has been edited.`;
    }
    this.toastMessageService.showToastMessage({
      severity: 'success',
      summary: $localize`Confirmation`,
      detail: msg
    });
  }

  private redirectToUsersList(): void {
    this.router.navigate([this.usersListLink]);
  }

  private isNewUser(): boolean {
    if (this.userId === 0) {
      return true;
    }
    return false;
  }

}
