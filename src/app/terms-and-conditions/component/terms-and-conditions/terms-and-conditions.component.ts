import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { GetTermsandConditions } from 'src/app/models/termsandconditionsModel';
import { SubSink } from 'subsink';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {

  @Input() termsandconditions$: Observable<GetTermsandConditions[]>;

  @Output() addConditionsEvent = new EventEmitter();
  @Output() editConditionsEvent = new EventEmitter<GetTermsandConditions>();
  
  termsandconditions: GetTermsandConditions;
  Editor = ClassicEditor;
  TandCForm: FormGroup;

  editorData = new FormControl();

  private subs = new SubSink();

  constructor(public languageService: LanguageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.TandCForm = this.fb.group({
      editorData: [null],
    })
    this.subs.add(this.termsandconditions$.subscribe(
      data => {
        if(!!data) {
          this.termsandconditions = {...data[0]};
          this.editorData.setValue(this.termsandconditions.tandctext);
        }
      }
    ))
  }

  addConditions() {
    this.addConditionsEvent.emit();
  }

  edit() {
    this.termsandconditions$.pipe(take(1)).subscribe(
      data => {
        var formData = {...data[0]};
        formData.tandctext = this.editorData.value;
        console.log(formData);
        this.editConditionsEvent.emit(formData);
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}