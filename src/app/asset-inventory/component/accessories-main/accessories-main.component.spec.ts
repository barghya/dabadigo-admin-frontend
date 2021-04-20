import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesMainComponent } from './accessories-main.component';

describe('AccessoriesMainComponent', () => {
  let component: AccessoriesMainComponent;
  let fixture: ComponentFixture<AccessoriesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoriesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
