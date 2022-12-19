import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertosComponent } from './puertos.component';

describe('PuertosComponent', () => {
  let component: PuertosComponent;
  let fixture: ComponentFixture<PuertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuertosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
