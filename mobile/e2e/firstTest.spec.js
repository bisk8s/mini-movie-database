const { reloadApp } = require('detox-expo-helpers');

describe('Navigation', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should start at home screen', async () => {
    await expect(element(by.id('MovieHome'))).toBeVisible();
  });
});
