import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: "orderby"
  })
  export class OrderByPipe {
    transform(array: any[], field: string): any[] {
        if (!array) {
          return [];
        }
        array.sort((a: any, b: any) => {
          if (a[field] === '' || b[field] === '' ||
              a[field] === null ||  b[field] === null ||
              typeof a[field] === 'undefined' || typeof b[field] === 'undefined') {
            return 0;
          }
          if (a[field].toLowerCase() < b[field].toLowerCase()) {
            return -1;
          } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
      }
  }