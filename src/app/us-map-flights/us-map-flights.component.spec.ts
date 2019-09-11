import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USMapFlightsComponent } from './us-map-flights.component';

describe('USMapFlightsComponent', () => {
  let component: USMapFlightsComponent;
  let fixture: ComponentFixture<USMapFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USMapFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USMapFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
