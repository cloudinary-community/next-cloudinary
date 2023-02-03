import { createPlaceholderUrl } from '../../src/lib/cloudinary';

// Mock console.warn() so we can see when it's called
global.console = {
  ...global.console,
  warn: jest.fn()
}

describe('Cloudinary', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = env;
  })

  describe('createPlaceholderUrl', () => {
    it('should create a placeholder URL with default settings', () => {
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle'
      });
      expect(url).toContain(`${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_100/f_auto/q_1/turtle`);
    });

    it('should create a placeholder URL in grayscale', () => {
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle',
        placeholder: 'grayscale'
      });
      expect(url).toContain(`${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_100/e_grayscale/f_auto/q_1/turtle`);
    });

    it('should create a placeholder URL with a color', () => {
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle',
        placeholder: 'color:blueviolet'
      });
      expect(url).toContain(`${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_100/e_grayscale/e_colorize:60,co_blueviolet/f_auto/q_1/turtle`);
    });
  });
})
