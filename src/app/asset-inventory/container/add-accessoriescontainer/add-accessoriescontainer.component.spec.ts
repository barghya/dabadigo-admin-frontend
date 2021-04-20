import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessoriescontainerComponent } from './add-accessoriescontainer.component';

describe('AddAccessoriescontainerComponent', () => {
  let component: AddAccessoriescontainerComponent;
  let fixture: ComponentFixture<AddAccessoriescontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccessoriescontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccessoriescontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
