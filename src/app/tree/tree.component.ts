import { Component, OnInit, Input } from '@angular/core';
import { NpmService } from '../../services/npm-service/npm.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() public updatePackageSubject: Subject<string>;
  private package: { name: string, version: string } = { name: "", version: "" };
  private dependencies: { name: string, version: string }[] = [];
  private error: string;

  constructor(private npmService: NpmService) {}

  ngOnInit(): void {
    this.updatePackageSubject.subscribe(packageName => {
      this.package.name = packageName;
      this.npmService.getLatestPackage(packageName)
      .then(npmPackage => {
        this.package.version = npmPackage.version;
        let keys = Object.keys(npmPackage.dependencies);
        this.dependencies = keys.map(key => ({ name: key, version: npmPackage.dependencies[key] }));
      })
      .catch(err => this.error = "This package doesn't exist or something went wrong.");
    });
  }

}
