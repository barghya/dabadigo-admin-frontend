import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LanguageService } from 'src/app/service/language/language.service';
import { ActivatedRoute } from '@angular/router';
import { ParameterManagementService } from 'src/app/service/parameter-management/parameter-management.service';
import { Parameter } from 'src/app/models/parametermanagementModel';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss']
})
export class EditParameterComponent implements OnInit,OnDestroy {
  ParameterEditForm: FormGroup;
  @Output() cancel = new EventEmitter();
  @Input() singleParameter$: Observable<Parameter>;
  @Output() ParameterEdit = new EventEmitter<Parameter>();
  subs = new SubSink();
  constructor(private formbuilder: FormBuilder, public languageService: LanguageService, private route: ActivatedRoute, private parameterManagementService: ParameterManagementService) { }

  ngOnInit() {
    this.ParameterEditForm = this.formbuilder.group({
      parameter_key: [''],
      parameter_value: ['', [Validators.required]],
    });
    this.subs.add(this.singleParameter$.subscribe(
      (data) => {
        if (!!data) {
          console.log("Patching");
          console.log(data);
            this.ParameterEditForm.patchValue(data);
            this.parameter_key.disable();
        }
      }
    ));
  }
  get parameter_key(): FormControl {
    return <FormControl> this.ParameterEditForm.get('parameter_key');
  }

  Cancel() {
    this.cancel.emit();
  }
  Update() {
    this.singleParameter$.pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data };
        formData.parameter_key = this.ParameterEditForm.controls.parameter_key.value;
        formData.parameter_value = this.ParameterEditForm.controls.parameter_value.value;
        console.log(data);
        this.ParameterEdit.emit(formData);
      }
    );
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
