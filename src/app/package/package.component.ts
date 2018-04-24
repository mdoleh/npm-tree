import { Component, OnInit, Input } from '@angular/core';
import { NpmService } from '../../services/npm-service/npm.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  @Input() public package: { name: string, version: string };
  private dependencies: { name: string, version: string }[] = [];

  constructor(private npmService: NpmService) { }

  ngOnInit() {
    this.npmService.getPackageByVersion(this.package.name, this.package.version)
      .then(npmPackage => {
        let keys = Object.keys(npmPackage.dependencies || {});
        this.dependencies = keys.map(key => ({ name: key, version: npmPackage.dependencies[key] }));
      });
  }

}
