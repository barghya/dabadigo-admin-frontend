import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsTransactionsContainerComponent } from './parts-transactions-container.component';

describe('PartsTransactionsContainerComponent', () => {
  let component: PartsTransactionsContainerComponent;
  let fixture: ComponentFixture<PartsTransactionsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsTransactionsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsTransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
