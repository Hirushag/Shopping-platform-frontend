import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDetalComponent } from './delivery-detal.component';

describe('DeliveryDetalComponent', () => {
  let component: DeliveryDetalComponent;
  let fixture: ComponentFixture<DeliveryDetalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDetalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
