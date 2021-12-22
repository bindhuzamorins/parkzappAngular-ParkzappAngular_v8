import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyField'
})
export class EmptyFieldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return `<b class="empty-field-x">x</b>`;
    }
  }

}