import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { userRole } from 'src/app/models/roleManagementModel';
import { RoleManagementService } from 'src/app/service/role-management/role-management.service';
import { LanguageService } from 'src/app/service/language/language.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  RoleForm: FormGroup;
  @Output() cancelAdd = new EventEmitter();
  @Output() addRole = new EventEmitter<userRole>();
  private subs = new SubSink();
  
  constructor(private fb: FormBuilder, public languageService: LanguageService, private roleManagementService: RoleManagementService) { }

  ngOnInit() {
    this.RoleForm = this.fb.group({
      role_name: ['', [Validators.required]],
      // control_element_name: ['', [Validators.required]],
      // control_element_type: ['', [Validators.required]],
    })
  }

  Cancel() {
    this.cancelAdd.emit();
  }

  AddRole() {
    var formData: userRole = {
      role_name: this.RoleForm.controls.role_name.value,
      // control_elements: [{
      // control_element_name:  this.RoleForm.controls.control_element_name.value,
      // control_element_type:  this.RoleForm.controls.control_element_type.value,
      // }]
    }
    this.addRole.emit(formData);
    console.log(formData);
    
  }


}
