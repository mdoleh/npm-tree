import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NpmService } from '../../services/npm-service/npm.service';
import { Subject } from 'rxjs';
import { DependencyListService } from '../../services/dependency-list/dependency-list.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnDestroy {
  @Input() public updatePackageSubject: Subject<string>;
  private package: { name: string, version: string } = { name: "", version: "" };
  private dependencies: { name: string, version: string }[] = [];
  private error: string;
  private dependencyCount: number;

  constructor(private npmService: NpmService, private dependencyListService: DependencyListService) {}

  ngOnInit(): void {
    this.updatePackageSubject.subscribe(packageName => {
      this.dependencyListService.clearList();
      this.package.name = packageName;
      this.npmService.getLatestPackage(packageName)
      .then(npmPackage => {
        this.package.version = npmPackage.version;
        let keys = Object.keys(npmPackage.dependencies);
        this.dependencies = keys.map(key => ({ name: key, version: npmPackage.dependencies[key] }));
      })
      .catch(err => this.error = "This package doesn't exist or something went wrong.");
    });

    this.dependencyListService.listCount.subscribe(count => this.dependencyCount = count);
  }

  ngOnDestroy(): void {
    this.updatePackageSubject.unsubscribe();
    this.dependencyListService.listCount.unsubscribe();
  }

}
