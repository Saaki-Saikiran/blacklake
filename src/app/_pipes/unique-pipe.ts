import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterUnique',
    pure: false
})
export class UniqueFilter implements PipeTransform {
    transform(items: any[], key: string): any[] {
        const uniqueArray = items.filter(function (a) {
            var key = a.tenantName;
            if (!this[key]) {
                this[key] = true;
                return true;
            }
        }, Object.create(null));
        return uniqueArray;
    }
}