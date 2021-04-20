import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PartsStockItem, PartsTransactionsFilter } from 'src/app/models/asset-inventoryModel';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';

@Component({
  selector: 'app-parts-inventory',
  templateUrl: './parts-inventory.component.html',
  styleUrls: ['./parts-inventory.component.scss']
})
export class PartsInventoryComponent implements OnInit {
  private subs = new SubSink();
  dataSource: MatTableDataSource<PartsStockItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['part_name', 'part_short_code', 'region_id', 'store_type', 'store_id', 'quantity', 'status', 'action']

  @Input() partsInventory$: Observable<PartsStockItem[]>;
  @Output() transactions = new EventEmitter<PartsTransactionsFilter>();
  @Output() addPartsStock = new EventEmitter();
  @Output() addPartsStockSpecific = new EventEmitter<PartsTransactionsFilter>();

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.partsInventory$.subscribe(
      partsInventory => {
        if(!!partsInventory) {
          this.dataSource = new MatTableDataSource<PartsStockItem>(partsInventory);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    ))
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

  Transactions(parts_master_id: number, region_id: number, store_type: number, store_id: number, status: number) {
    this.transactions.emit({
      parts_master_id: parts_master_id,
      region_id: region_id,
      status: status,
      store_id: store_id,
      store_type: store_type
    })
  }

  AddPartsStockSpecific(parts_master_id: number, region_id: number, store_type: number, store_id: number, status: number) {
    this.addPartsStockSpecific.emit({
      parts_master_id: parts_master_id,
      region_id: region_id,
      status: status,
      store_id: store_id,
      store_type: store_type
    })
  }

  AddPartsStock() {
    this.addPartsStock.emit();
  }
}
