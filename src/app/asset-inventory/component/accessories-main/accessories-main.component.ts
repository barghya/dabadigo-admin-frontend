import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { accessory } from 'src/app/models/asset-inventoryModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accessories-main',
  templateUrl: './accessories-main.component.html',
  styleUrls: ['./accessories-main.component.scss']
})
export class AccessoriesMainComponent implements OnInit {

  displayedColumns: string[] = ['accessories_type', 'asset_unique_id', 'status'];
  dataSource = new MatTableDataSource<accessory[]>();
  
  @Output() addaccessories = new EventEmitter();
  @Input() accessories$: Observable<accessory[]>;
  
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  addAccessories() {
    this.router.navigate(['asset-inventory', 'add-accessories']);
    this.addaccessories.emit;
  }

}
