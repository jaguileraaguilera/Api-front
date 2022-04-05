import { TestBed } from '@angular/core/testing';

import { ServicioAutoresService } from './servicio-autores.service';

describe('ServicioAutoresService', () => {
  let service: ServicioAutoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAutoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
