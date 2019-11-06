import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterUnique',
    pure: false
})
export class UniqueFilter implements PipeTransform {
    transform(items: any[], key: string): any[] {
        if (!items) {
            return [];
        }

        if (!Array.isArray(items)) {
            return items;
        }

        if (Array.isArray(items)) {
            var newArr = [], found;
            for (var x = 0; x < items.length; x++) {
                found = undefined;
                for (var y = 0; y < newArr.length; y++) {

                    if (Object.keys(key)[0] === 'target') {
                        if (items[x].target === newArr[y].target) {
                            found = true;
                            break;
                        }
                    }

                    if (Object.keys(key)[0] === 'method') {
                        if (items[x].method === newArr[y].method) {
                            found = true;
                            break;
                        }
                    }
                    
                    if (Object.keys(key)[0] === 'activity') {
                        if (items[x].activity === newArr[y].activity) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    newArr.push(items[x]);
                }
            }
            return newArr;
        }
    }
}