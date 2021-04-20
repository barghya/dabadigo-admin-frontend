import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMasterMainComponent } from './parts-master-main.component';

describe('PartsMasterMainComponent', () => {
  let component: PartsMasterMainComponent;
  let fixture: ComponentFixture<PartsMasterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsMasterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMasterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
