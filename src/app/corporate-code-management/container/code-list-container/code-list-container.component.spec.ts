import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeListContainerComponent } from './code-list-container.component';

describe('CodeListContainerComponent', () => {
  let component: CodeListContainerComponent;
  let fixture: ComponentFixture<CodeListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
