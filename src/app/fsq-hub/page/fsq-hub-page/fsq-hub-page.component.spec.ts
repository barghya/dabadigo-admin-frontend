import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqHubPageComponent } from './fsq-hub-page.component';

describe('FsqHubPageComponent', () => {
  let component: FsqHubPageComponent;
  let fixture: ComponentFixture<FsqHubPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqHubPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqHubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
