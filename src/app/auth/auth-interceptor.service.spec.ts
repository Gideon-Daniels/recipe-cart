import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorServiceTsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthInterceptorService],
    }),
  );

  it('should be created', () => {
    const interceptor: AuthInterceptorService = TestBed.inject(
      AuthInterceptorService,
    );
    expect(interceptor).toBeTruthy();
  });
});
