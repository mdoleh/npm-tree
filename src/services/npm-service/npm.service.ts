import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PackageVersion, Package } from '../../models/package';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class NpmService {
  private NPM_URL: string = "https://registry.npmjs.cf/";

  constructor(private http: Http) { }

  public getLatestPackage(packageName: string): Promise<PackageVersion> {
    return new Promise((resolve, reject) => {
      this.makeGetCall(packageName, (data: Package) => {
        let latestVersion = data["dist-tags"].latest;
        let current = data.versions[latestVersion];
        current.version = this.getValidVersion(current.version);
        this.formatDependencyVersions(current);
        return current;
      })
      .subscribe(data => resolve(data), err => reject(err));
    });
  }

  public getPackageByVersion(packageName: string, version: string): Promise<PackageVersion> {
    if (version === "*") return this.getLatestPackage(packageName);
    return new Promise((resolve, reject) => {
      this.makeGetCall(packageName, npmPackage => {
        let current = npmPackage.versions[version];
        if (!current) current = npmPackage.versions[npmPackage["dist-tags"].latest];
        current.version = this.getValidVersion(current.version);
        this.formatDependencyVersions(current);
        return current;
      })
      .subscribe(data => resolve(data), err => reject(err));
    });
  }

  private makeGetCall(packageName: string, processingFunc: (npmPackage: Package) => PackageVersion): Observable<PackageVersion> {
    return this.http.get(`${this.NPM_URL}${packageName}`)
      .map(response => response.json())
      .map((data: Package) => processingFunc(data))
      .take(1);
  }

  private formatDependencyVersions(current: PackageVersion) {
    if (current.dependencies) {
      Object.keys(current.dependencies).map(key => {
        let version = current.dependencies[key];
        current.dependencies[key] = this.getValidVersion(version);
      });
    }
  }

  private getValidVersion(version: string): string {
    if (version === "*") return version;
    version = version.replace(/[A-z]/g, "");
    let matches = version.match(/[0-9]+\.[0-9]+\.[0-9]+|[0-9]+/g);
    let parsedVersions = matches.map(verString => verString.split(".")
        .map(value => parseInt(value)));

    return this.getLargestVersion(parsedVersions);
  }

  private getLargestVersion(parsedVersions: number[][]): string {
    let largestIndex = 0;
    for (let i = 1; i < parsedVersions.length; ++i) {
      for (let j = 0; j < parsedVersions[i].length; ++j) {
        if (parsedVersions[largestIndex][j] > parsedVersions[i][j]) break;
        else if (parsedVersions[largestIndex][j] < parsedVersions[i][j]) {
          largestIndex = i;
          break;
        }
      }
    }
    return parsedVersions[largestIndex].join(".");
  }
}
