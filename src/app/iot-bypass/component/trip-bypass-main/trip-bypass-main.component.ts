import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-trip-bypass-main',
  templateUrl: './trip-bypass-main.component.html',
  styleUrls: ['./trip-bypass-main.component.scss']
})
export class TripBypassMainComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["vehicle_no","current_status","trip_id","action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>([
      {
        vehicle_no: "Wb52Y 3290",
        current_status: "book",
        trip_id: "XYZ012546779"
      }
    ]);
  }

  
  applyFilter(value: string) {

  }


}
