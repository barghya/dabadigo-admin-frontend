import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LanguageService } from 'src/app/service/language/language.service';
import { ApproveRequestFSQ, FSQDetail, FsqAllHub, EditHubLevel } from 'src/app/models/fsqManagement';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomainData } from 'src/app/models/domainModel';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-verify-document',
  templateUrl: './verify-document.component.html',
  styleUrls: ['./verify-document.component.scss']
})
export class VerifyDocumentComponent implements OnInit, OnDestroy {
  @Input() verifiedDetail$: Observable<FSQDetail>;
  @Input() AllfsqLevel$: Observable<DomainData[]>;
  @Input() AllFsqHub$: Observable<FsqAllHub[]>;
  @Output() cancelDocument = new EventEmitter();
  @Output() Approve = new EventEmitter();
  @Output() EditLevelHub = new EventEmitter<EditHubLevel>();
  EditButtonToggle: boolean = false;
  private subs = new SubSink();
  fsqData: FSQDetail;
  admin_user_id: number;
  EditHubLevelForm:FormGroup;
  constructor(public languageService: LanguageService,  private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.EditHubLevelForm = this.formbuilder.group({
      hub: ['',[Validators.required]],
      level: ['', [Validators.required]],
    })
    this.subs.add(this.verifiedDetail$.subscribe(
      (data) => {
        if (!!data) {
          console.log(data);
          this.fsqData= data;
          this.admin_user_id = data.admn_user_id;
          this.EditHubLevelForm.patchValue({
            hub: data.hub_id,
            level: data.fsq_skill_level
          });
          this.EditButtonToggle= false;
          this.EditHubLevelForm.disable();
          console.log(this.admin_user_id);

        }
      }
    ));
  }

  approve() {
    var data: ApproveRequestFSQ = {
      admn_user_id: this.admin_user_id,
    }
    this.Approve.emit(data);
    console.log(data);

  }

  cancel() {
    this.cancelDocument.emit()
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  displayHub(data?: number): string | undefined{
    var hub: FsqAllHub = !!data && this.AllFsqHub$ ? this.showHub(data) : undefined;
    return hub ? hub.hub_name : undefined;
  }
  showHub(data?: number){
    var hub: FsqAllHub = {}
    this.AllFsqHub$ .pipe(take(1)).subscribe(
      hubitem=>{
        hub = hubitem.find(m=> m.hub_id == data)
      }
    );
    return hub;
  }
  displayLevel(data?: number): string | undefined{
    var level: DomainData = !!data && this.AllfsqLevel$ ? this.showLevel(data) : undefined;
    return level ? level.domain_text : undefined;
  }
  showLevel(data?: number){
    var level: DomainData = {}
    this.AllfsqLevel$ .pipe(take(1)).subscribe(
      Levelitem=>{
        level = Levelitem.find(m=> m.domain_code == data)
      }
    );
    return level;
  }
  Edit(){
    this.EditButtonToggle= true;
    this.EditHubLevelForm.enable();
  }
  save(){
    this.EditButtonToggle= false;
    this.EditHubLevelForm.disable();
    var data : EditHubLevel={
      admn_user_id: this.admin_user_id,
      fsq_skill_level: this.EditHubLevelForm.controls['level'].value,
      hub_id: this.EditHubLevelForm.controls['hub'].value
    }
    this.EditLevelHub.emit(data);
  }
  UpdateCancel(){
    this.EditHubLevelForm.patchValue({
      hub: this.fsqData.hub_id,
      level: this.fsqData.fsq_skill_level
    });
    this.EditButtonToggle= false;
    this.EditHubLevelForm.disable();;
  }

}

