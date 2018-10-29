import { SharedModule } from './shared/shared.module';

describe('SharedModule', () => {
  let sharedsharedModule: SharedModule;

  beforeEach(() => {
    sharedsharedModule = new SharedModule();
  });

  it('should create an instance', () => {
    expect(sharedsharedModule).toBeTruthy();
  });
});
