import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsqHubContainerComponent } from './fsq-hub-container.component';

describe('FsqHubContainerComponent', () => {
  let component: FsqHubContainerComponent;
  let fixture: ComponentFixture<FsqHubContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsqHubContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsqHubContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
