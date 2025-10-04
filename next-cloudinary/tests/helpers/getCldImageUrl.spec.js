import { vi, describe, it, beforeEach, afterAll, expect } from 'vitest';

import { getCldImageUrl } from '../../src/helpers/getCldImageUrl';

describe('Cloudinary', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('getCldImageUrl', () => {
    it('should pass', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const url = getCldImageUrl({
        src: 'turtle',
        width: 100,
        height: 100
      });

      expect(url).toContain(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/f_auto/q_auto/v1/turtle`);
    });

    it('should support auto_pad crop mode with auto gravity', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const url = getCldImageUrl({
        src: 'turtle',
        width: 960,
        aspectRatio: '16:9',
        crop: 'auto_pad',
        gravity: 'auto'
      });

      expect(url).toContain('c_auto_pad');
      expect(url).toContain('g_auto');
      expect(url).toContain('ar_16:9');
      expect(url).toContain('w_960');
    });

    it('should support auto_pad crop mode with width and height', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const url = getCldImageUrl({
        src: 'turtle',
        width: 960,
        height: 540,
        crop: 'auto_pad',
        gravity: 'auto'
      });

      expect(url).toContain('c_auto_pad');
      expect(url).toContain('g_auto');
      expect(url).toContain('w_960');
      expect(url).toContain('h_540');
    });
  });

  describe('Config', () => {
    it('should configure a cname via secure distribution environment variables', () => {
      const cloudName = 'customtestcloud';
      const secureDistrubtion = 'mywebsite.dev';
      const privateCdn = true;

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;
      process.env.NEXT_PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION = secureDistrubtion;
      process.env.NEXT_PUBLIC_CLOUDINARY_PRIVATE_CDN = privateCdn;

      const url = getCldImageUrl({
        src: 'turtle',
        width: 100,
        height: 100
      });

      expect(url).toContain(`https://${secureDistrubtion}/image/upload/c_limit,w_100/f_auto/q_auto/v1/turtle`);
    });
  });
})
