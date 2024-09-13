import { vi, describe, it, beforeEach, afterAll, expect } from 'vitest';

import { getCldOgImageUrl } from '../../src/helpers/getCldOgImageUrl';
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../../src/constants/sizes';

describe('Cloudinary', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('getCldOgImageUrl', () => {
    it('should pass use defaults to create a URL', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const src = 'turtle';

      const url = getCldOgImageUrl({
        src
      });

      expect(url).toContain(`https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${OG_IMAGE_WIDTH},h_${OG_IMAGE_HEIGHT},g_center/c_limit,w_${OG_IMAGE_WIDTH}/f_jpg/q_auto/v1/${src}`);
    });

    it('should allow customization of width and height', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const src = 'turtle';
      const width = 800;
      const height = 600;

      const url = getCldOgImageUrl({
        src,
        width,
        height
      });

      expect(url).toContain(`https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${width},h_${height},g_center/c_limit,w_${width}/f_jpg/q_auto/v1/${src}`);
    });
  });
})