import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsDefinitionComponent } from './parts-definition.component';

describe('PartsDefinitionComponent', () => {
  let component: PartsDefinitionComponent;
  let fixture: ComponentFixture<PartsDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
