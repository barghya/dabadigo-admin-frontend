import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqRequestPageComponent } from './fsq-request-page.component';

describe('FsqRequestPageComponent', () => {
  let component: FsqRequestPageComponent;
  let fixture: ComponentFixture<FsqRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
