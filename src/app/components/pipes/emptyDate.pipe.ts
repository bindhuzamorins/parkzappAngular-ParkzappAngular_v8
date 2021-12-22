import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyDate'
})
export class EmptyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == '0000-00-00') {
      return `<b class="empty-field-x">x</b>`;
    } else {
      return value;
    }
  }

}