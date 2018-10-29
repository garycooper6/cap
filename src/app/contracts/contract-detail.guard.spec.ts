import { TestBed, async, inject } from '@angular/core/testing';

import { ContractDetailGuard } from './contract-detail.guard';

describe('ContractDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractDetailGuard]
    });
  });

  it('should ...', inject([ContractDetailGuard], (guard: ContractDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
