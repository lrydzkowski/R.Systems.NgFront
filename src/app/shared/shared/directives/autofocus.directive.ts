import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[sharedFormAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private host: ElementRef) { }

  @HostListener('submit')
  onFormSubmit(): void {
    const invalidControl = this.host.nativeElement.querySelector('.ng-invalid');
    if (invalidControl) {
      invalidControl.focus();
    }
  }

  ngAfterViewInit(): void {
    const input = this.host.nativeElement.querySelector('input');
    if (input) {
      input.focus();
    }
  }

}
