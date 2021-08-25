import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormWithCalendar } from '@features/tests/models/reactive-form-with-calendar';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';

@Component({
  selector: 'app-reactive-form-with-calendar-page',
  templateUrl: './reactive-form-with-calendar-page.component.html',
  styleUrls: ['./reactive-form-with-calendar-page.component.css']
})
export class ReactiveFormWithCalendarPageComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    text: ['', { updateOn: 'blur' }],
    date: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    public formHandler: FormHandlerService) { }

  ngOnInit(): void {
    this.handleFieldChangeEvent();
  }

  handleFieldChangeEvent(): void {
    this.form.valueChanges.subscribe({
      next: x => {
        console.log(x);
      }
    });
  }

  onSubmit(): void {
    if (!this.formHandler.isFormValid(this.form)) {
      return;
    }
    const fieldValues: ReactiveFormWithCalendar = this.formHandler.getFieldValues<ReactiveFormWithCalendar>(this.form);
    console.log('submit');
    console.log(fieldValues);
  }

}
