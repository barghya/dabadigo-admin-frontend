import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMainComponent } from './part-main.component';

describe('PartMainComponent', () => {
  let component: PartMainComponent;
  let fixture: ComponentFixture<PartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
