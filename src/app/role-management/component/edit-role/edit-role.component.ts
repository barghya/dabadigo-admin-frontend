import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { userRole } from 'src/app/models/roleManagementModel';
import { SubSink } from 'subsink';
import { RoleManagementService } from 'src/app/service/role-management/role-management.service';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  RoleEditForm: FormGroup;
  @Output() cancelEdit = new EventEmitter();
  @Input() singleRole$: Observable<userRole>;
  @Output() editRole = new EventEmitter<userRole>();
  private subs = new SubSink();
  constructor(private fb: FormBuilder, public languageService: LanguageService, private roleManagementService: RoleManagementService) { }

  ngOnInit() {
    this.RoleEditForm = this.fb.group({
      role_name: ['', [Validators.required]],
      // control_element_name: ['', [Validators.required]],
      // control_element_type: ['', [Validators.required]],
    });
    this.subs.add(this.singleRole$.subscribe(
      (data) => {
        if (!!data) {
          console.log("Patching");
          console.log(data);
            this.RoleEditForm.patchValue(data);
        }
      }
    ));
  }

  Cancel() {
    this.cancelEdit.emit();
  }

  EditRole() {
    this.singleRole$.pipe(take(1)).subscribe(
      (data) => {
        var formData = { ...data };
        formData.role_name = this.RoleEditForm.controls.role_name.value;
        // formData.control_elements = [{
        //   control_element_name: this.RoleEditForm.controls.control_element_name.value,
        //   control_element_type: this.RoleEditForm.controls.control_element_type.value
        // }]
        console.log(data);
        this.editRole.emit(formData);
      }
    );
  }

}
