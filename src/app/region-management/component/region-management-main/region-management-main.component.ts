import { Component, OnInit, EventEmitter, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RegionItem } from 'src/app/models/regionManagement';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-region-management-main',
  templateUrl: './region-management-main.component.html',
  styleUrls: ['./region-management-main.component.scss']
})
export class RegionManagementMainComponent implements OnInit, OnDestroy {
  @Input() regionList$: Observable<RegionItem[]>;
  @Output() addRegion = new EventEmitter();
  @Output() editRegion = new EventEmitter<number>();
  private subs =  new SubSink();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ["region_code","region_name","countries_name","states_name", "city_name", "created_on","action" ];
  dataSource: MatTableDataSource<RegionItem>;
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.regionList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<RegionItem>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

 
  AddRegion() {
     this.addRegion.emit();
  }
  EditRegion(value: number) {
    console.log(value);
    this.editRegion.emit(value);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }


}
