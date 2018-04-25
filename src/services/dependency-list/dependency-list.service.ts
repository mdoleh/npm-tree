import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DependencyListService {
  public listCount: Subject<number> = new Subject();
  private dependencyList: { [key: string]: string[] } = <{[key: string]: string[]}>{};

  constructor() { }

  addToList(packageName: string, version: string): void {
    if (this.dependencyList[packageName]) {
      this.dependencyList[packageName].push(version);
    } else {
      this.dependencyList[packageName] = [version];
    }
    this.listCount.next(Object.keys(this.dependencyList).length);
  }

  versionExists(packageName: string, version: string): boolean {
    return this.dependencyList[packageName] && this.dependencyList[packageName].includes(version);
  }

  packageExists(packageName: string): boolean {
    return !!this.dependencyList[packageName];
  }

  clearList(): void {
    this.dependencyList = {};
  }
}
