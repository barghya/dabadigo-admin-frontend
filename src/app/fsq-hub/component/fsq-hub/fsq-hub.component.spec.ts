import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqHubComponent } from './fsq-hub.component';

describe('FsqHubComponent', () => {
  let component: FsqHubComponent;
  let fixture: ComponentFixture<FsqHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
