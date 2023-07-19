import { TestBed } from '@angular/core/testing';

import { ServicService } from './services.service';

describe('ServicesService', () => {
  let service: ServicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
