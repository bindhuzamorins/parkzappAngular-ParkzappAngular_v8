import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onOff'
})
export class OnOffPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === true) {
      return 'On';
    } else if (value === false) {
      return 'Off';
    }
  }

}