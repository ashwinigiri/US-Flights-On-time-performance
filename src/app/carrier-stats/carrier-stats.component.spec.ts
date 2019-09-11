import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierStatsComponent } from './carrier-stats.component';

describe('CarrierStatsComponent', () => {
  let component: CarrierStatsComponent;
  let fixture: ComponentFixture<CarrierStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
