import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { StateTaxItem } from 'src/app/models/stateTaxModel';
import { SubSink } from 'subsink';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { states } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-state-tax-main',
  templateUrl: './state-tax-main.component.html',
  styleUrls: ['./state-tax-main.component.scss']
})
export class StateTaxMainComponent implements OnInit, OnDestroy {

  @Input() stateTaxList$: Observable<StateTaxItem[]>;
  @Input() singleStateTax$: Observable<StateTaxItem>;
  @Input() states$: Observable<states[]>;
  @Input() taxTypes$: Observable<DomainData[]>;
  @Output() addStateTax = new EventEmitter();
  @Output() editStateTax = new EventEmitter<number>();
  @Output() addStateTaxSubmit = new EventEmitter<StateTaxItem>();
  @Output() editStateTaxSubmit = new EventEmitter<StateTaxItem>();
  @Output() deleteStateTax = new EventEmitter<number>();
  private subs =  new SubSink();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ["state_id","tax_type","tax_rate","action" ];
  dataSource: MatTableDataSource<StateTaxItem>;
  CreateMode: boolean = false;
  
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.stateTaxList$.subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<StateTaxItem>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ));
  }

  AddStateTax() {
    this.CreateMode = true;
    this.addStateTax.emit();
  }

  EditStateTax(admn_state_tax_id: number) {
    this.CreateMode = true;
    this.editStateTax.emit(admn_state_tax_id);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  CancelModify() {
    this.CreateMode = false;
  }

  AddStateTaxSubmit(data: StateTaxItem) {
    this.addStateTaxSubmit.emit(data);
    this.CreateMode = false;
  }

  EditStateTaxSubmit(data: StateTaxItem) {
    this.editStateTaxSubmit.emit(data);
    this.CreateMode = false;
  }

  DeleteStateTax(admn_state_tax_id: number) {
    this.deleteStateTax.emit(admn_state_tax_id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
