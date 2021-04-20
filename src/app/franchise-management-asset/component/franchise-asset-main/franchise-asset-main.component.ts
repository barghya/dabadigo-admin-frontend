import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { DomainData } from 'src/app/models/domainModel';
import { FranchiseAssets } from 'src/app/models/franchiseVehicleModel';


@Component({
  selector: 'app-franchise-asset-main',
  templateUrl: './franchise-asset-main.component.html',
  styleUrls: ['./franchise-asset-main.component.scss']
})
export class FranchiseAssetMainComponent implements OnInit {
  displayedColumns: string[] = ['vehicle_idnumber', 'chassis_number', 'manufacturer', 'model', 'manufacture_date', 'vehicle_type', 'vehicle_status', 'action'];
  dataSource: MatTableDataSource<FranchiseAssets>;
  @Input() assets$: Observable<FranchiseAssets[]>;
  @Output() viewAsset = new EventEmitter<number>();
  subs = new SubSink();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  totalList: FranchiseAssets[];
  constructor(private router: Router, public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.assets$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<FranchiseAssets>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.totalList = data;
        console.log(this.totalList);
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewDetails(vehicle_id: number) {
    this.viewAsset.emit(vehicle_id);
  }

}
