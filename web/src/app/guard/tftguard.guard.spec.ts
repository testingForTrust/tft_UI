import { TestBed, async, inject } from '@angular/core/testing';

import { TFTguardGuard } from './tftguard.guard';

describe('TFTguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TFTguardGuard]
    });
  });

  it('should ...', inject([TFTguardGuard], (guard: TFTguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
