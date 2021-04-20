import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAddContainerComponent } from './code-add-container.component';

describe('CodeAddContainerComponent', () => {
  let component: CodeAddContainerComponent;
  let fixture: ComponentFixture<CodeAddContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeAddContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAddContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
