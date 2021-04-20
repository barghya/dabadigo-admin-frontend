import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsDefinitionContainerComponent } from './parts-definition-container.component';

describe('PartsDefinitionContainerComponent', () => {
  let component: PartsDefinitionContainerComponent;
  let fixture: ComponentFixture<PartsDefinitionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsDefinitionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsDefinitionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
