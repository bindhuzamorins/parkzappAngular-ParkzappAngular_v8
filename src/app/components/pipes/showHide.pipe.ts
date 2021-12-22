import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showHide'
})
export class showHidePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === true) {
      return 'Active';
    } else if (value === false) {
      return 'Hidden';
    }
  }

}