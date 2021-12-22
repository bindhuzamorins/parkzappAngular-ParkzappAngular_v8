import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyDescription'
})
export class EmptyDescriptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value;
    } else {
      return 'no description';
    }
  }

}