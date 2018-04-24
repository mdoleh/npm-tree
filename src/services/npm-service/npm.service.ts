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
      this.http.get(this.NPM_URL + packageName)
        .map(response => response.json())
        .map((data: Package) => {
          let latestVersion = data["dist-tags"].latest;
          return data.versions[latestVersion];
        })
        .take(1)
        .subscribe(data => resolve(data));
    });
  }
}
