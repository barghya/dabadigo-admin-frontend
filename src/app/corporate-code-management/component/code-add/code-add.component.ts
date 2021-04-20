import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DomainData } from 'src/app/models/domainModel';
import { CorporateManagement } from 'src/app/models/corporateManagement';
import { map } from 'rxjs/operators';
import { CorporateCodeManagementService } from 'src/app/service/corporate-code-management/corporate-code-management.service';
import { corporateCodeList } from 'src/app/models/corporateCodeManagementModel';

@Component({
  selector: 'app-code-add',
  templateUrl: './code-add.component.html',
  styleUrls: ['./code-add.component.scss']
})
export class CodeAddComponent implements OnInit {

  addCorporateCodeForm: FormGroup;
  @Output() addCodeEvent = new EventEmitter();
  @Output() addAnotherCodeEvent = new EventEmitter();
  @Output() cancelAddEvent = new EventEmitter();
  @Input() codeTypes$: Observable<DomainData[]>;
  @Input() codeStatus$: Observable<DomainData[]>;
  @Input() corporates$: Observable<CorporateManagement[]>;

  constructor(public languageService: LanguageService, public fb: FormBuilder, private corporateCodeManagementService: CorporateCodeManagementService) { }

  ngOnInit() {
    this.addCorporateCodeForm = this.fb.group({
      code_type: ['', [Validators.required]],
      corporate_code: ['', [Validators.required], [this.validateCorporateCode.bind(this)]],
      status: ['', [Validators.required]],
      admn_partner_id: ['', [Validators.required]],
    })
  }

  addCode() {
    console.log(this.addCorporateCodeForm);
    
    var formData: corporateCodeList = {
      code_type: +this.addCorporateCodeForm.controls.code_type.value,
      corporate_code: this.addCorporateCodeForm.controls.corporate_code.value,
      status: this.addCorporateCodeForm.controls.status.value,
      admn_partner_id: this.addCorporateCodeForm.controls.admn_partner_id.value
    }
    this.addCodeEvent.emit(formData);
  }

  // addAnotherCode() {
  //   var formData: corporateCodeList = {
  //     code_type: +this.addCorporateCodeForm.controls.code_type.value,
  //     corporate_code: this.addCorporateCodeForm.controls.corporate_code.value,
  //     status: this.addCorporateCodeForm.controls.status.value,
  //     admn_partner_id: this.addCorporateCodeForm.controls.admn_partner_id.value
  //   }

  //   this.addAnotherCodeEvent.emit(formData);
  //   this.addCorporateCodeForm.reset();
  //   this.addCorporateCodeForm.setErrors(null);
  //   this.addCorporateCodeForm.updateValueAndValidity();
  //   console.log(formData);
  // }

  cancelAddCode() {
    this.cancelAddEvent.emit();
  }

  formatResponse = map((val: any) => {
    return val.response ? {duplicateCorporateCode: true} : null;
  });

  validateCorporateCode(control: AbstractControl) {
    var booleanResponse = this.corporateCodeManagementService.CheckDuplicateCorporateCode(control.value);
    return this.formatResponse(booleanResponse);
  }
}
