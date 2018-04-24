import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private package: string;
  private showTree: boolean = false;
  private updatePackageSubject: Subject<string> = new Subject();

  getDependencies(): void {
    this.updatePackageSubject.next(this.package);
  }
}
