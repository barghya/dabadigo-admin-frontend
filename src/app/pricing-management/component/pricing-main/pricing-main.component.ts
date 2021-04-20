import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PricingItem, BatteryswapPricingItem } from 'src/app/models/pricingManagement';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { DomainData } from 'src/app/models/domainModel';
import { RegionItem } from 'src/app/models/regionManagement';

@Component({
  selector: 'app-pricing-main',
  templateUrl: './pricing-main.component.html',
  styleUrls: ['./pricing-main.component.scss']
})
export class PricingMainComponent implements OnInit {

  @Input() pricingList$: Observable<PricingItem[]>;
  @Input() batteryswappricingList$: Observable<BatteryswapPricingItem[]>;
  @Input() vehicleTypes$: Observable<DomainData[]>;
  @Input() regions$: Observable<RegionItem[]>;
  @Output() addPricing = new EventEmitter();
  @Output() addBatterySwapPricing = new EventEmitter();
  @Output() editPricing = new EventEmitter<number>();
  @Output() editbatteryswapPricing = new EventEmitter<number>();
  @Output() deletePricing = new EventEmitter<number>();
  @Output() deletebatteryswapPricing = new EventEmitter<number>();
  displayedColumns: string[] = ["tier", "display_name", "tier_min_value", "tier_max_value", "per_minute_unit", "cost", "temp_cost", "min_amount", "vehicle_unlocked_cost", "vehicle_type_name", "region_name", "price_table_type_name", "admn_partner_name", "action"];
  BatterySwapdisplayedColumns: string[] = ["display_name", "no_of_initial_swap", "initial_swap_price", "consecutive_swap_price", "vehicle_type_name", "region_name", "price_table_type_name", "action"];
  dataSource: MatTableDataSource<PricingItem>;
  datasourcebatteryswap: MatTableDataSource<BatteryswapPricingItem>;
  @ViewChild("priceSort", {static: true}) priceSort: MatSort;
  @ViewChild("pricePaginator", {static: true}) pricePaginator: MatPaginator;
  @ViewChild("batSwapSort", {static: true}) batSwapSort: MatSort;
  @ViewChild("batSwapPaginator", {static: true}) batSwapPaginator: MatPaginator;
  private subs = new SubSink();
  totalList: PricingItem[];
  totalList1: BatteryswapPricingItem[];
  selectedRegion: number = 0;
  selectedVehicleType: number = 0;
  selectedbatteryswapRegion: number = 0;
  selectedbatteryswapVehicleType: number = 0;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.subs.add(this.pricingList$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<PricingItem>(data);
        this.dataSource.sort = this.priceSort;
        this.dataSource.paginator = this.pricePaginator;
        this.totalList = data;
        console.log(this.totalList);

      }
    ));
    this.subs.add(this.batteryswappricingList$.subscribe(
      (data) => {
        this.datasourcebatteryswap = new MatTableDataSource<BatteryswapPricingItem>(data);
        this.datasourcebatteryswap.sort = this.batSwapSort;
        this.datasourcebatteryswap.paginator = this.batSwapPaginator;
        this.totalList1 = data;
        console.log(this.totalList1);

      }
    ));

  }

  AddPricing() {
    this.addPricing.emit();
  }

  EditPricing(price_table_id: number) {
    this.editPricing.emit(price_table_id);
  }

  DeletePricing(price_table_id: number) {
    this.deletePricing.emit(price_table_id);
  }

  AddBatterySwapPricing() {
    this.addBatterySwapPricing.emit();
  }

  EditBatterySwapPricing(batteryswap_price_table_id: number) {
    this.editbatteryswapPricing.emit(batteryswap_price_table_id)
  }

  DeleteBatterySwapPricing(batteryswap_price_table_id: number) {
    this.deletebatteryswapPricing.emit(batteryswap_price_table_id);
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  vehicleTypeChange(value: number) {
    this.selectedVehicleType = value;
    this.calculateFilter();

  }

  batteryswapvehicleTypeChange(value: number) {
    this.selectedbatteryswapVehicleType = value;
    this.calculatebatteryswapFilter();
  }

  regionChange(value: number) {
    this.selectedRegion = value;
    this.calculateFilter();
  }

  batteryswapregionChange(value: number) {
    this.selectedbatteryswapRegion = value;
    this.calculatebatteryswapFilter();
  }

  calculateFilter() {
    if (this.selectedVehicleType == 0 && this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<PricingItem>(this.totalList);
    }
    else if (this.selectedVehicleType == 0) {
      this.dataSource = new MatTableDataSource<PricingItem>(this.totalList.filter(m => m.region == this.selectedRegion));
    }
    else if (this.selectedRegion == 0) {
      this.dataSource = new MatTableDataSource<PricingItem>(this.totalList.filter(m => m.vehicle_type == this.selectedVehicleType));
    }
    else {
      this.dataSource = new MatTableDataSource<PricingItem>(this.totalList.filter(m => m.vehicle_type == this.selectedVehicleType && m.region == this.selectedRegion));
    }
    this.dataSource.sort = this.priceSort;
    this.dataSource.paginator = this.pricePaginator;
  }

  calculatebatteryswapFilter() {
    if (this.selectedbatteryswapVehicleType == 0 && this.selectedbatteryswapRegion == 0) {
      this.datasourcebatteryswap = new MatTableDataSource<BatteryswapPricingItem>(this.totalList1);
    }
    else if (this.selectedbatteryswapVehicleType == 0) {
      this.datasourcebatteryswap = new MatTableDataSource<BatteryswapPricingItem>(this.totalList1.filter(m => m.region == this.selectedbatteryswapRegion));
    }
    else if (this.selectedbatteryswapRegion == 0) {
      this.datasourcebatteryswap = new MatTableDataSource<BatteryswapPricingItem>(this.totalList1.filter(m => m.vehicle_type == this.selectedbatteryswapVehicleType));
    }
    else {
      this.datasourcebatteryswap = new MatTableDataSource<BatteryswapPricingItem>(this.totalList1.filter(m => m.vehicle_type == this.selectedbatteryswapVehicleType && m.region == this.selectedbatteryswapRegion));
    }
    this.datasourcebatteryswap.sort = this.batSwapSort;
    this.datasourcebatteryswap.paginator = this.batSwapPaginator;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
