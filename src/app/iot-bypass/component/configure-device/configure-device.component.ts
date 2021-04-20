import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Bypass, Bypasslist } from 'src/app/models/iotControllereModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';

@Component({
  selector: 'app-configure-device',
  templateUrl: './configure-device.component.html',
  styleUrls: ['./configure-device.component.scss']
})
export class ConfigureDeviceComponent implements OnInit {

  dataSource: MatTableDataSource<Bypasslist>;
  displayedColumns: string[] = ["bypass_name", "action"];
  @Output() cancelEvents = new EventEmitter();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() bypasslist$: Observable<Bypass>;
  bypassList: Bypass;
  @Output() saveEvent = new EventEmitter<Bypass>();
  private subs = new SubSink();
  constructor(public languageService: LanguageService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subs.add(this.bypasslist$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          this.bypassList = JSON.parse(JSON.stringify(data));
          console.log(this.bypassList);
          this.dataSource = new MatTableDataSource<Bypasslist>(data.bypass_list);
          this.dataSource.sort = this.sort;

        }
      }
    ));
  }
  BypassCheck(checked: boolean, id: number) {
    if (checked) {
      this.bypassList.bypass_list.find(m=> m.bypass_id ===id).bypass_status= 1;
    }
    else {
      this.bypassList.bypass_list.find(m=> m.bypass_id ===id).bypass_status= 0;
    }
    console.log(this.bypassList);
    
  }

  Cancel() {
    this.cancelEvents.emit();
  }

  Save() {
    this.saveEvent.emit(this.bypassList);
  }

}
