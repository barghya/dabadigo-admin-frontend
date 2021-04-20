import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { StateTaxItem } from 'src/app/models/stateTaxModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { LanguageService } from 'src/app/service/language/language.service';
import { Ms3Validators } from 'src/app/validators/ms3-validators';
import { states } from 'src/app/models/regionManagement';
import { DomainData } from 'src/app/models/domainModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-state-tax-modify',
  templateUrl: './state-tax-modify.component.html',
  styleUrls: ['./state-tax-modify.component.scss']
})
export class StateTaxModifyComponent implements OnInit {

  @Input() singleStateTax$: Observable<StateTaxItem>;
  @Input() states$: Observable<states[]>;
  @Input() taxTypes$: Observable<DomainData[]>;
  @Output() cancel = new EventEmitter();
  @Output() addStateTax = new EventEmitter<StateTaxItem>();
  @Output() editStateTax = new EventEmitter<StateTaxItem>();
  StateTaxForm: FormGroup;
  private subs = new SubSink();

  constructor(private fb: FormBuilder, public languageService: LanguageService) { }

  ngOnInit() {
    this.StateTaxForm = this.fb.group({
      state_id: ["", [Validators.required]],
      tax_type: ["", [Validators.required]],
      tax_rate: ["", [Validators.required, Ms3Validators.percentage]],
    })

    this.subs.add(this.singleStateTax$.subscribe(
      singleStateTax => {
        if(!!singleStateTax) {
          this.StateTaxForm.patchValue(singleStateTax);
        }
      }
    ))
  }

  Cancel() {
    this.cancel.emit();
  }

  AddStateTax() {
    console.log(this.StateTaxForm.value);
    this.addStateTax.emit({
      state_id: this.StateTaxForm.controls.state_id.value,
      tax_rate: +this.StateTaxForm.controls.tax_rate.value,
      tax_type: this.StateTaxForm.controls.tax_type.value
    })
  }

  EditStateTax() {
    this.singleStateTax$.pipe(take(1)).subscribe(
      singleStateTax => {
        var stateTax = {...singleStateTax};
        stateTax.state_id = this.StateTaxForm.controls.state_id.value;
        stateTax.tax_rate = this.StateTaxForm.controls.tax_rate.value;
        stateTax.tax_type = this.StateTaxForm.controls.tax_type.value;
        this.editStateTax.emit(stateTax);
      }
    )
  }
}
