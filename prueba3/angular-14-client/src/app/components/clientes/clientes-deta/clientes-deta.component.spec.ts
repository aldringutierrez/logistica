import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDetaComponent } from './clientes-deta.component';

describe('ClientesDetaComponent', () => {
  let component: ClientesDetaComponent;
  let fixture: ComponentFixture<ClientesDetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesDetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesDetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
