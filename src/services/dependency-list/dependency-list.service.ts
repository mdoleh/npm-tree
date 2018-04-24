import { Injectable } from '@angular/core';

@Injectable()
export class DependencyListService {
  private dependencyList: { [key: string]: boolean } = <{[key: string]: boolean}>{};

  constructor() { }

  addToList(packageName: string, version: string): void {
    this.dependencyList[`${packageName}${version}`] = true;
  }

  alreadyExists(packageName: string, version: string): boolean {
    return this.dependencyList[`${packageName}${version}`];
  }
}
