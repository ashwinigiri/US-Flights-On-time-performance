import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BipartiteComponent } from './bipartite.component';

describe('BipartiteComponent', () => {
  let component: BipartiteComponent;
  let fixture: ComponentFixture<BipartiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BipartiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BipartiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
