import { UserAutenticatedGuard } from './user-autenticated.guard';

describe('UserAutenticatedGuard', () => {
  it('should be defined', () => {
    expect(new UserAutenticatedGuard()).toBeDefined();
  });
});
