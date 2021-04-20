import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { FranchisePricingItem } from 'src/app/models/franchisePricingModel';
import { RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-franchise-pricing-main',
  templateUrl: './franchise-pricing-main.component.html',
  styleUrls: ['./franchise-pricing-main.component.scss']
})
export class FranchisePricingMainComponent implements OnInit,OnDestroy {

  @Input() franchisepricingList$: Observable<FranchisePricingItem[]>;
  dataSource: MatTableDataSource<FranchisePricingItem>;
  @ViewChild("franchiseSort", {static: true}) franchiseSort: MatSort;
  @ViewChild("franchisePaginator", {static: true}) franchisePaginator: MatPaginator;
  private subs = new SubSink();
  totalList: FranchisePricingItem[];
  @Output() addPricing = new EventEmitter();
  @Output() editPricing = new EventEmitter<number>();
  @Output() deletePricing = new EventEmitter<number>();
  selectedRegion: number = 0;
  @Input() regions$: Observable<RegionItem[]>;
  displayedColumns: string[] =["region_name","start_rentalpoint_rate","start_rentalpoint_max_cost","end_rentalpoint_rate","end_rentalpoint_max_cost","vehicle_owner_rate","vehicle_owner_max_cost","partner_name","action"];
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.franchisepricingList$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<FranchisePricingItem>(data);
        this.dataSource.sort = this.franchiseSort;
        this.dataSource.paginator = this.franchisePaginator;
        this.totalList = data;
        console.log(this.totalList);

      }
    ));
  }

  AddPricing() {
    this.addPricing.emit();
  }

  EditPricing(franchise_price_table_id: number) {
    this.editPricing.emit(franchise_price_table_id);
  }

  DeletePricing(franchise_price_table_id: number) {
    this.deletePricing.emit(franchise_price_table_id);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  regionChange(value: number) {
    this.selectedRegion = value;
    this.calculateFilter();
  }
  calculateFilter() {
    if (this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<FranchisePricingItem>(this.totalList);
    }
    // else if (this.selectedVehicleType == 0) {
    //   this.dataSource = new MatTableDataSource<PricingItem>(this.totalList.filter(m => m.region == this.selectedRegion));
    // }
    // else if (this.selectedRegion == 0) {
    //   this.dataSource = new MatTableDataSource<FranchisePricingItem>(this.totalList.filter(m => m.vehicle_type == this.selectedVehicleType));
    // }
    else {
      this.dataSource = new MatTableDataSource<FranchisePricingItem>(this.totalList.filter(m =>m.region_id == this.selectedRegion));
    }
    this.dataSource.sort = this.franchiseSort;
    this.dataSource.paginator = this.franchisePaginator;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
