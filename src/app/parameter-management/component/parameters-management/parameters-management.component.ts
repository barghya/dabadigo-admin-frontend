import { Component, OnInit, Input, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parameters-management',
  templateUrl: './parameters-management.component.html',
  styleUrls: ['./parameters-management.component.scss']
})
export class ParametersManagementComponent implements OnInit,OnDestroy {
  dataSource: MatTableDataSource<Parameter>;
  displayedColumns: string[] = ["parameter_key","parameter_value","action"];
  private subs =  new SubSink();
  @Input() parameterList$: Observable<Parameter[]>;
  totalList: Parameter[];
  @Output() addParameter = new EventEmitter();
  @Output() editParameter = new EventEmitter<number>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( public languageService: LanguageService) { }

  ngOnInit() {
   
  }
  ngOnChanges() {
    this.subs.add(this.parameterList$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Parameter>(data);
        console.log(data);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
        
        
      }
    ));
  }
  applyFilter(value: string) {
     this.dataSource.filter = value.trim().toLowerCase();
  }
  addParameters(){
    this.addParameter.emit();
  }

  EditParameter(admn_parameters_id: number){
    this.editParameter.emit(admn_parameters_id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
