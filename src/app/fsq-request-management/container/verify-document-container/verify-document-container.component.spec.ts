import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDocumentContainerComponent } from './verify-document-container.component';

describe('VerifyDocumentContainerComponent', () => {
  let component: VerifyDocumentContainerComponent;
  let fixture: ComponentFixture<VerifyDocumentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyDocumentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDocumentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
