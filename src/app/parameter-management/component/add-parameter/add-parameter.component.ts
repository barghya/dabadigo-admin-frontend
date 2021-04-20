import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { ActivatedRoute } from '@angular/router';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { ParameterManagementService } from 'src/app/service/parameter-management/parameter-management.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-parameter',
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.scss']
})
export class AddParameterComponent implements OnInit {
  ParameterForm: FormGroup;
  @Output() cancelAdd = new EventEmitter();
  @Output() addparameterevent = new EventEmitter();
  @Output() addanotherparameterevent = new EventEmitter();
  constructor(private formbuilder: FormBuilder, public languageService: LanguageService, private route: ActivatedRoute,private parameterManagementService: ParameterManagementService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.ParameterForm = this.formbuilder.group({
      parameter_key: ['',[Validators.required], [this.validateParameterkey.bind(this)]],
      parameter_value: ['', [Validators.required]],
    })
  }


  Cancel() {
    this.cancelAdd.emit();
  }

  AddParameter() {
    var formData: Parameter = {
      parameter_key: this.ParameterForm.controls.parameter_key.value,
      parameter_value: this.ParameterForm.controls.parameter_value.value,
    }
    this.addparameterevent.emit(formData);
    console.log(formData);
    
  }

  // AddAnotherParameter() {
  //   var postData: Parameter = {
  //     parameter_key: this.ParameterForm.controls.parameter_key.value,
  //     parameter_value: this.ParameterForm.controls.parameter_value.value,
  //   }
  //   this.addanotherparameterevent.emit(postData);
  //   console.log(postData);
  //   this.ParameterForm.reset();
  //   this.ParameterForm.setErrors(null);
  //   this.ParameterForm.updateValueAndValidity();

  // }

  
  formatResponseparameterKey = map((val: any) => {
    console.log(val.response);
    return val.response ? {duplicateparameterkey: true } : null;
  });

  validateParameterkey(control: AbstractControl) {
    var booleanResponse = this.parameterManagementService.DuplicateParameter(control.value);
    console.log(booleanResponse);
    
    return this.formatResponseparameterKey(booleanResponse);
  }

}
