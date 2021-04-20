import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { LanguageService } from 'src/app/service/language/language.service';
import { Observable } from 'rxjs';
import { EmailDetails, SendEmailModel, CommunicationDetails } from 'src/app/models/corporateBillingModel';
import { SubSink } from 'subsink';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  displayedColumns: string[] = ['reminder_date', 'reminder_notes'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<CommunicationDetails>;
  @Input() emailDetails$: Observable<EmailDetails>;

  @Output() cancelevent = new EventEmitter();
  @Output() sendEmailEvent = new EventEmitter<SendEmailModel>();
  EmailForm: FormGroup;
  Editor = ClassicEditor;
  Editor1 = ClassicEditor;
  editorData = new FormControl();
  editorData1 = new FormControl();

  private subs = new SubSink();
  constructor(private formbuilder: FormBuilder, public languageService: LanguageService ) { }

  ngOnInit() {
    this.EmailForm = this.formbuilder.group({
      email_subject: [null, [Validators.required]],
      editorData: [null],
      editorData1: [null]
    })
    this.subs.add(this.emailDetails$.subscribe(
      data => {
        if(!!data) {
          console.log(data);
          this.dataSource = new MatTableDataSource<CommunicationDetails>(data.communication_history)
          var patchData = { ...data };
          this.EmailForm.controls.email_subject.patchValue(patchData.current_email.email_subject);
          this.editorData.setValue(patchData.current_email.email_body);
          //this.editorData1.setValue(patchData.current_email.notes);
        }
      }
    ))
  }

  cancel() {
    this.cancelevent.emit();
  }

  sendEmail() {
    this.emailDetails$.subscribe(
      data => {
        var formData = { ...data.current_email };
        formData.email_subject = this.EmailForm.controls.email_subject.value;
        formData.email_body = this.editorData.value;
        formData.notes = this.editorData1.value;
        console.log(formData);
        this.sendEmailEvent.emit(formData);
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
