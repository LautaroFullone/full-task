import { HasAutorizationGuard } from './has-autorization.guard';

describe('HasAutorizationGuard', () => {
  it('should be defined', () => {
    expect(new HasAutorizationGuard()).toBeDefined();
  });
});
