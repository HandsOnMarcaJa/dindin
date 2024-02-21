import { ValidateIdMiddleware } from './validate-id.middleware';

describe('ValidateIdMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateIdMiddleware()).toBeDefined();
  });
});
