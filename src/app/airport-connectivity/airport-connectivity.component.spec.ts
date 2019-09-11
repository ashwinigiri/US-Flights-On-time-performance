import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportConnectivityComponent } from './airport-connectivity.component';

describe('AirportConnectivityComponent', () => {
  let component: AirportConnectivityComponent;
  let fixture: ComponentFixture<AirportConnectivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportConnectivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportConnectivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
