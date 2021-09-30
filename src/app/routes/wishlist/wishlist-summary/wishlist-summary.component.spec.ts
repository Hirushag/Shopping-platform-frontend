import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSummaryComponent } from './wishlist-summary.component';

describe('WishlistSummaryComponent', () => {
  let component: WishlistSummaryComponent;
  let fixture: ComponentFixture<WishlistSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
