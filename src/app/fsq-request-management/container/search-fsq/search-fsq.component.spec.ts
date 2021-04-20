import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFsqComponent } from './search-fsq.component';

describe('SearchFsqComponent', () => {
  let component: SearchFsqComponent;
  let fixture: ComponentFixture<SearchFsqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFsqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFsqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
