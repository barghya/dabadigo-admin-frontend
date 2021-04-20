import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { RentalPoint, RpId, AvailableFranchise } from 'src/app/models/rentalPoint';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { DomainData } from 'src/app/models/domainModel';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-rental-point-main',
  templateUrl: './rental-point-main.component.html',
  styleUrls: ['./rental-point-main.component.scss']
})
export class RentalPointMainComponent implements OnInit, OnDestroy{
  checked = false;
  color = "primary";
  
  displayedColumns: string[] = [ 'rentalpoint_name','region_name','city_name','rentalpoint_ownership_name','address', 'opening_hours', 'closing_hours', 'rentalpoint_type_name','rentalpoint_status_name', 'action' ];
  datasource: MatTableDataSource  <RentalPoint>;
  @Input() rentalpoint_det$: Observable<RentalPoint[]>;
  @Input() rentalpoint_ownership$: Observable<DomainData[]>
  @Output() openbottomsheet = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() deleteRP = new EventEmitter<RpId>();
  @Output() moveRp  = new EventEmitter<number>();
  @Output() RpHistory = new EventEmitter<number>();
  @Output() editrentalPoint = new EventEmitter<number>();
  @Input() franchise$: Observable<AvailableFranchise[]>;
  frnchiseDisable : boolean = true;
  subs = new SubSink();
  selectedOwnershipType: number = 0;
  totalList: RentalPoint[];
  Filter: FormGroup;
  constructor(public languageService: LanguageService, private router: Router,public fb: FormBuilder,   private route: ActivatedRoute) { }

  ngOnInit() {
    this.Filter = this.fb.group({
      wonership: [0],
      franchise: [0],
    })
    this.subs.add(this.route.queryParams.subscribe(params => {
      var admn_partner_id = +params['id'];
      if(!!admn_partner_id){
        this.Filter.patchValue({
          wonership: 2,
          franchise: admn_partner_id
        })
      }
    }));
    this.subs.add(this.rentalpoint_det$.subscribe(
      (data) => {
        this.totalList = data;
        console.log(this.totalList);
        this.filter();
      }
    ));
  }
  filter() {
    if(+this.Filter.controls.wonership.value == 0){
      this.Filter.controls.franchise.patchValue(0);
      this.frnchiseDisable = true;
      this.datasource = new MatTableDataSource<RentalPoint>(this.totalList);
    }else if(+this.Filter.controls.wonership.value == 2){
      this.frnchiseDisable = false;
      if(+this.Filter.controls.franchise.value == 0){
        this.datasource = new MatTableDataSource<RentalPoint>(this.totalList.filter(m => +m.ownership_code == 2));
      }else{
        this.datasource = new MatTableDataSource<RentalPoint>(this.totalList.filter(m => +m.ownership_code == 2 && m.franchise_id == +this.Filter.controls.franchise.value));
      }
    }else{
      this.frnchiseDisable = true;
      this.Filter.controls.franchise.patchValue(0);
      this.datasource = new MatTableDataSource<RentalPoint>(this.totalList.filter(m => +m.ownership_code == +this.Filter.controls.wonership.value));
    }
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  openBottomSheet() {
    this.openbottomsheet.emit();
  }

  applyFilter(value: string) {
    this.datasource.filter = value.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  editRentalPoint(rentalpoint_id: number) {
    console.log(rentalpoint_id);
    this.editrentalPoint.emit(rentalpoint_id);
  }

  deleteRentalPoint(id: number) {
    var data: RpId = {
      rentalpoint_id: id
    } 
    this.deleteRP.emit(data);
  }

  rentalPointHistory(id: number) {
    console.log('History Rp: ', id);
    this.RpHistory.emit(id);
  }

  moveRentalPoint(id: number) {
    console.log('Remove RP: ',id);
    this.moveRp.emit(id);
  }

  changed(value: boolean) {
    this.checked = value;
    if (value) {
      this.router.navigate(['rental-point' , 'rental-point-map-view']);
    }
    else if(!value) {
      this.router.navigate(['rental-point' , 'rental-point-main']);
    }
  }


}
