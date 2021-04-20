import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditContainerComponent } from './code-edit-container.component';

describe('CodeEditContainerComponent', () => {
  let component: CodeEditContainerComponent;
  let fixture: ComponentFixture<CodeEditContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeEditContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
