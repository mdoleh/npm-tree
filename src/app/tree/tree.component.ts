import { Component, OnInit, Input } from '@angular/core';
import { NpmService } from '../../services/npm-service/npm.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() public package: string;
  private packageModel: string = "";

  constructor(private npmService: NpmService) {}

  ngOnInit(): void {
    this.npmService.getLatestPackage(this.package)
      .then(data => this.packageModel = JSON.stringify(data));
  }

}
