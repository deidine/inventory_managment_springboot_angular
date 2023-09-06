import { TestBed } from '@angular/core/testing';

import { LoginCheckService } from './login-check.service';

describe('LoginCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCheckService = TestBed.get(LoginCheckService);
    expect(service).toBeTruthy();
  });
});
