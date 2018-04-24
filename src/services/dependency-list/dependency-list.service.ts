import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DependencyListService {
  public listCount: Subject<number> = new Subject();
  private dependencyList: { [key: string]: boolean } = <{[key: string]: boolean}>{};

  constructor() { }

  addToList(packageName: string, version: string): void {
    this.dependencyList[`${packageName}${version}`] = true;
    this.listCount.next(Object.keys(this.dependencyList).length);
  }

  alreadyExists(packageName: string, version: string): boolean {
    return this.dependencyList[`${packageName}${version}`];
  }

  clearList(): void {
    this.dependencyList = {};
  }
}
