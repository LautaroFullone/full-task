import { TaskExistsGuard } from './task-exists.guard';

describe('TaskExistsGuard', () => {
  it('should be defined', () => {
    expect(new TaskExistsGuard()).toBeDefined();
  });
});
