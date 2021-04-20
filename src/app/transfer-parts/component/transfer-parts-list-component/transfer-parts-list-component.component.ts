import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PartsTransferItem, TransferRequestActionPayload } from 'src/app/models/transferpartsModel';
import { LanguageService } from 'src/app/service/language/language.service';
import { SubSink } from 'subsink';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-transfer-parts-list-component',
  templateUrl: './transfer-parts-list-component.component.html',
  styleUrls: ['./transfer-parts-list-component.component.scss']
})
export class TransferPartsListComponentComponent implements OnInit {
  @Input() partsTransferList$: Observable<PartsTransferItem[]>;
  @Output() showHidePastData = new EventEmitter<boolean>();
  @Output() approve = new EventEmitter<TransferRequestActionPayload>();
  @Output() reject = new EventEmitter<TransferRequestActionPayload>();
  @Output() delete = new EventEmitter<TransferRequestActionPayload>();
  @Output() addTransfer = new EventEmitter();
  private subs = new SubSink();
  dataSource: MatTableDataSource<PartsTransferItem>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [
    'parts_transfer_ref',
    'part_name',
    'part_short_code', 
    'source_region_id', 
    'source_store_type', 
    'source_store_id', 
    'destination_region_id', 
    'destination_store_type', 
    'destination_store_id',
    'updated_on',
    'updated_by',
    'source_part_status',
    'destination_part_status',
    'transfer_status',
    'quantity',
    'action'
  ]

  past_flag: boolean = false;

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    this.subs.add(this.partsTransferList$.subscribe(
      partsTransferList => {
        if(!!partsTransferList) {
          this.dataSource = new MatTableDataSource<PartsTransferItem>(partsTransferList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    ))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ShowHidePastData(past_flag: boolean) {
    this.past_flag = past_flag;
    this.showHidePastData.emit(past_flag);
  }

  Approve(parts_transfer_id: number) {
    this.approve.emit({
      parts_transfer_id: parts_transfer_id,
      past_flag: this.past_flag
    });
  }

  Reject(parts_transfer_id: number) {
    this.reject.emit({
      parts_transfer_id: parts_transfer_id,
      past_flag: this.past_flag
    });
  }

  Delete(parts_transfer_id: number) {
    this.delete.emit({
      parts_transfer_id: parts_transfer_id,
      past_flag: this.past_flag
    });
  }

  AddTransfer() {
    this.addTransfer.emit();
  }
}
