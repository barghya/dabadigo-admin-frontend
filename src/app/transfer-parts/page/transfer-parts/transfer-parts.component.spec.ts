import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPartsComponent } from './transfer-parts.component';

describe('TransferPartsComponent', () => {
  let component: TransferPartsComponent;
  let fixture: ComponentFixture<TransferPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
