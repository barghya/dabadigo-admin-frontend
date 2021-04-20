import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit {
  SearchForm: FormGroup;
  @Input() displayedColumns: string[];
  @Input() headers: any[];
  dataSource: MatTableDataSource<any>;
  @Input() dataset$: Observable<any[]>;
  @Output() search = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  @Output() selected = new EventEmitter();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subs = new SubSink();

  constructor(public languageService: LanguageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.SearchForm = this.fb.group({
      search_string: ["", [Validators.required]]
    });

    this.subs.add(this.dataset$.subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ));
  }

  Search() {
    this.search.emit(this.SearchForm.controls.search_string.value);
  }

  Cancel() {
    this.cancel.emit();
  }

  Selected(data: any) {
    this.selected.emit(data);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
