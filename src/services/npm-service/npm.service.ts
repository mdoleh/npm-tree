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
        return data.versions[latestVersion];
      })
      .subscribe(data => resolve(data), err => reject(err.json()));
    });
  }

  public getPackageByVersion(packageName: string, version: string): Promise<PackageVersion> {
    version = version.replace(/\D/, "");
    return new Promise((resolve, reject) => {
      this.makeGetCall(packageName, npmPackage => npmPackage.versions[version])
        .subscribe(data => resolve(data), err => reject(err.json()));
    });
  }

  private makeGetCall(packageName: string, processingFunc: (npmPackage: Package) => PackageVersion): Observable<PackageVersion> {
    return this.http.get(`${this.NPM_URL}${packageName}`)
      .map(response => response.json())
      .map((data: Package) => processingFunc(data))
      .take(1);
  }
}
