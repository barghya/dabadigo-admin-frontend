import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CorporateManagement, AdmnPartnerId, AddUserService } from 'src/app/models/corporateManagement';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { DomainData } from 'src/app/models/domainModel';

@Component({
  selector: 'app-corporate-management-main',
  templateUrl: './corporate-management-main.component.html',
  styleUrls: ['./corporate-management-main.component.scss']
})
export class CorporateManagementMainComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'company_name', 'partner_name', 'partner_code', 'partner_type_name', 'partner_category_name', 'addressline1', 'states_name', 'country_name', 'city_name', 'contact_phone', 'updated_by', 'action' ];
  datasource: MatTableDataSource<CorporateManagement>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() openCorporate = new EventEmitter();
  @Output() editcorporate = new EventEmitter<number>(); 
  @Input() corporate_det$: Observable<CorporateManagement[]>;
  @Input() partnerType$: Observable<DomainData[]>;
  @Output() addCorporateuser = new EventEmitter<AddUserService>();
  @Output() viewBillsEvent = new EventEmitter<number>();
  @Output() viewvehicleEvent = new EventEmitter<number>();
  @Output() viewRpEvent = new EventEmitter<number>();
  subs = new SubSink();
  selectedPartnerType: number = 0;
  totalList: CorporateManagement[];
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.corporate_det$.subscribe(
      (data) => {
        this.datasource = new MatTableDataSource<CorporateManagement>(data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        console.log(data);
        this.totalList = data;
        console.log(this.totalList);
      }
    ));
  }

  partnerTypeChange(value: number) {
    this.selectedPartnerType = value;
    this.filter();
  }

  filter() {
    if (this.selectedPartnerType == 0) {
      this.datasource = new MatTableDataSource<CorporateManagement>(this.totalList);
    }
    else if (this.selectedPartnerType == 0) {
      this.datasource = new MatTableDataSource<CorporateManagement>(this.totalList.filter(m => m.partner_type == this.selectedPartnerType));
    }
    else {
      this.datasource = new MatTableDataSource<CorporateManagement>(this.totalList.filter(m => m.partner_type == this.selectedPartnerType));
    }
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  openAddCorporate() {
    this.openCorporate.emit()
  }

  applyFilter(value: string) {
    this.datasource.filter = value.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  editCorporate(value: number) {
    // console.log('Edit method: ',value);
    this.editcorporate.emit(value);
  }

  deleteCorporate(value: number) {
    console.log('delete method:', value);
  }

  addCorporateUser(corporate_id: number, partner_type: number ) {
    console.log(corporate_id, partner_type);
    this.addCorporateuser.emit({
      corporate_id: corporate_id,
      partner_type: partner_type
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  bills(data: number){
    this.viewBillsEvent.emit(data);
  }
  vehicle(data: number){
    this.viewvehicleEvent.emit(data);
  }
  rentalPoint(data: number){
    this.viewRpEvent.emit(data);
  }
}
