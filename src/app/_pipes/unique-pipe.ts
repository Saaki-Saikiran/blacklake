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
}