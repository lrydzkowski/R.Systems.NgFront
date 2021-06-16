import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHandlerService } from 'src/app/shared/services/form-handler.service';

@Component({
  selector: 'user-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formHandler.setFormGroup(this.form);
  }

  submit(): void {
    console.log('submit');
    if (this.isProcessing) {
      return;
    }
    if (!this.formHandler.isFormValid()) {
      return;
    }
    this.isProcessing = true;
  }

}
