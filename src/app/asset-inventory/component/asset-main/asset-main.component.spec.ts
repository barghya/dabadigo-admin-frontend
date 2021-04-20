import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMainComponent } from './asset-main.component';

describe('AssetMainComponent', () => {
  let component: AssetMainComponent;
  let fixture: ComponentFixture<AssetMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
