import { Component, OnInit, Input } from '@angular/core';
import { NpmService } from '../../services/npm-service/npm.service';
import { DependencyListService } from '../../services/dependency-list/dependency-list.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  @Input() public package: { name: string, version: string, packageExists: boolean, versionExists: boolean };
  private dependencies: { name: string, version: string, packageExists: boolean, versionExists: boolean }[] = [];

  constructor(
    private npmService: NpmService,
    private dependencyListService: DependencyListService
  ) { }

  ngOnInit() {
    if (this.package.versionExists || this.package.packageExists) return;
    this.npmService.getPackageByVersion(this.package.name, this.package.version)
      .then(npmPackage => {
        let keys = Object.keys(npmPackage && npmPackage.dependencies || {});
        this.dependencies = keys.map(key => ({ 
          name: key,
          version: npmPackage.dependencies[key],
          versionExists: this.dependencyListService.versionExists(key, npmPackage.dependencies[key]),
          packageExists: this.dependencyListService.packageExists(key)
        }));
        this.dependencies.forEach(item => this.dependencyListService.addToList(item.name, item.version));
      });
  }
}
