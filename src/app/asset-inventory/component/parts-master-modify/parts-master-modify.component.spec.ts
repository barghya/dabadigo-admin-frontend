import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMasterModifyComponent } from './parts-master-modify.component';

describe('PartsMasterModifyComponent', () => {
  let component: PartsMasterModifyComponent;
  let fixture: ComponentFixture<PartsMasterModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsMasterModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMasterModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
