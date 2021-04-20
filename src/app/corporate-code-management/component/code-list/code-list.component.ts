import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { corporateCodeList, corporateCodeID } from 'src/app/models/corporateCodeManagementModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit {

  displayedColumns: string[] = ['partner_name', 'corporate_code', 'code_type_name', 'created_on', 'updated_on', 'code_status_name', 'action'];
  dataSource: MatTableDataSource<corporateCodeList>;

  @Output() addCodeEvent = new EventEmitter();
  @Output() editCodeEvent = new EventEmitter();
  @Output() deleteCodeEvent = new EventEmitter<corporateCodeID>();
  @Input() code$ : Observable<corporateCodeList[]>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subs = new SubSink();
  
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    
    this.subs.add(this.code$.subscribe(
      (data) => {
          this.dataSource = new MatTableDataSource<corporateCodeList>(data);
          console.log(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
    ))
  }

  addCode() {
    this.addCodeEvent.emit();
  }

  editCode(admn_corporatecode_id: number) {
    console.log(admn_corporatecode_id);
    this.editCodeEvent.emit(admn_corporatecode_id);
  }

  deleteCode(admin_corporatecode_id: number) {
    var data : corporateCodeID = {
      admn_corporatecode_id: admin_corporatecode_id
    }
    console.log(admin_corporatecode_id);
    this.deleteCodeEvent.emit(data);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
