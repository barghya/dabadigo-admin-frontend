import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appStateModel';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { corporateCodeList } from 'src/app/models/corporateCodeManagementModel';
import { SubSink } from 'subsink';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.scss']
})
export class CodeEditComponent implements OnInit, OnDestroy{
  @Input() codeTypes$: Observable<DomainData[]>;
  @Input() codeStatus$: Observable<DomainData[]>;
  @Input() corporates$: Observable<CorporateManagement[]>;
  @Input() singleCode$ : Observable<corporateCodeList>;
  @Output() CorporateEditForm = new EventEmitter<corporateCodeList>();
  @Output() cancelCode = new EventEmitter;
  editCorporateCodeForm:FormGroup;
  private subs = new SubSink();
  public updatedOn: Date;
  constructor(public languageService: LanguageService,private formbuilder: FormBuilder,private store: Store<AppState>) { }

  ngOnInit() {
    this.editCorporateCodeForm = this.formbuilder.group({
      code_type: ['', [Validators.required]],
      corporate_code: ['', [Validators.required]],
      status: ['', [Validators.required]],
      admn_partner_id: ['', [Validators.required]],
    })

    this.subs.add(this.singleCode$.subscribe(
      (data) => {
        if(!!data) {
          console.log("Patching");
          console.log(data);
          var patchData = {...data};
          this.editCorporateCodeForm.patchValue(data);
          this.corporate_code.disable();
          this.updatedOn = data.updated_on;
        }
      }
    ));
  }

  editCode() {
    this.store.select(state => state.corporate_code_management.singleCode).pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data};
        formData.code_type = +this.editCorporateCodeForm.controls.code_type.value;
        formData.corporate_code = this.editCorporateCodeForm.controls.corporate_code.value;
        formData.status = this.editCorporateCodeForm.controls.status.value;
        formData.admn_partner_id = this.editCorporateCodeForm.controls.admn_partner_id.value;
        console.log(data);
        this.CorporateEditForm.emit(formData);
      }
    )
  }

  canceleditCode() {
    this.cancelCode.emit()
  }
  get corporate_code(): FormControl {
    return <FormControl> this.editCorporateCodeForm.get('corporate_code');
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
