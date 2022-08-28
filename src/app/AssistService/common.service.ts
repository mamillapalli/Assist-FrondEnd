import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})

export class commonService {
  filterValues : any = {};
  constructor() {
  }

  applyFilter(searchFilter: any,dataSource:any) {
    dataSource.filter = '';
    if(searchFilter !== null) {
      let htp = {
        filterId : searchFilter.label,
        filterValue : searchFilter.values.field
      }
      this.filterValues[searchFilter.label] = searchFilter.values.field
      return dataSource.filter = JSON.stringify(this.filterValues);
    }
  }

  clearColumn(columnKey: string,dataSource:any): string {
    this.applyFilter(null,dataSource);
    return dataSource.filter = '';
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }
}
