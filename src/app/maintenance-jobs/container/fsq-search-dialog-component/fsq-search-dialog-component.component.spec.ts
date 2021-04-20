import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqSearchDialogComponentComponent } from './fsq-search-dialog-component.component';

describe('FsqSearchDialogComponentComponent', () => {
  let component: FsqSearchDialogComponentComponent;
  let fixture: ComponentFixture<FsqSearchDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqSearchDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqSearchDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
