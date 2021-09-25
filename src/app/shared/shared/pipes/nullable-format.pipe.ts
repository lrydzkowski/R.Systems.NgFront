import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullableFormat'
})
export class NullableFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'undefined' || value === null) {
      return '-';
    }
    return value;
  }

}
