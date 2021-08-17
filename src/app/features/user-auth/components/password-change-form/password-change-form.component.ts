import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalWindowOperationEnum } from '@shared/shared/models/modal-window-operation-enum';
import { FormToolsService } from '@shared/shared/services/form-tools.service';
import { ModalWindowHandlerService } from '@shared/shared/services/modal-window-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-auth-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit, OnDestroy {

  visible: boolean = false;

  private openWindowSubscription: Subscription | null = null;

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
    private modalWindowHandler: ModalWindowHandlerService,
    private formBuilder: FormBuilder,
    public formTools: FormToolsService) { }

  ngOnInit(): void {
    this.subscribeOpenWindowEvent();
  }

  ngOnDestroy(): void {
    this.unsubscribeOpenWindowEvent();
  }

  private subscribeOpenWindowEvent(): void {
    this.modalWindowHandler.onOpenWindow('password-change-form').subscribe({
      next: (modalWindowOperation: ModalWindowOperationEnum) => {
        if (modalWindowOperation != ModalWindowOperationEnum.Open) {
          return;
        }
        this.visible = true;
      }
    });
  }

  private unsubscribeOpenWindowEvent(): void {
    if (this.openWindowSubscription === null) {
      return;
    }
    this.openWindowSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (!this.formTools.isFormValid(this.form)) {
      return;
    }
    const fieldValues: object = this.formTools.getFieldValues({}, this.form);
    console.log('submit');
    console.log(fieldValues);
  }

}
