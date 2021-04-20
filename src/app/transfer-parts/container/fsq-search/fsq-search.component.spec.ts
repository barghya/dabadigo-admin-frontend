import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqSearchComponent } from './fsq-search.component';

describe('FsqSearchComponent', () => {
  let component: FsqSearchComponent;
  let fixture: ComponentFixture<FsqSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
