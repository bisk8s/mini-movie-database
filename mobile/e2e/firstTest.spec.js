const { reloadApp } = require('detox-expo-helpers');

describe('Navigation', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('MovieHome'))).toBeVisible();
  });
});
