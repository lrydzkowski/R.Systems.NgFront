import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormToolsService {

  constructor() { }

  isFieldValid(formGroup: FormGroup, fieldName: string): boolean {
    const field: AbstractControl | null = formGroup.get(fieldName);
    if (field?.invalid && (field?.dirty || field?.touched)) {
      return false;
    } else {
      return true;
    }
  }

  fieldHasValidationError(formGroup: FormGroup, fieldName: string, validationErrorName: string): boolean {
    const field: AbstractControl | null = formGroup.get(fieldName);
    if (field === null) {
      return false;
    }
    return field?.hasError(validationErrorName);
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  isFormValid(formGroup: FormGroup): boolean {
    if (formGroup.invalid) {
      this.validateAllFields(formGroup);
      return false;
    }
    return true;
  }

  getFieldValues(values: { [key: string]: unknown }, formGroup: FormGroup): object {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.value instanceof Date) {
          const date = control.value;
          if (date == null) {
            values[field] = null;
          } else {
            values[field] = date.toISOString();
          }
        } else {
          let value = control.value;
          if (typeof value === 'string') {
            value = value.trim();
            if (value.length === 0) {
              value = null;
            }
          } else if (typeof value === 'number') {
            value = control.value;
            if (value === 0) {
              value = null;
            }
          } else {
            value = control.value;
          }
          values[field] = value;
        }
      } else if (control instanceof FormGroup) {
        values[field] = this.getFieldValues({}, control);
      }
    });
    return values;
  }
}
