import { getCldVideoUrl } from '../../src/helpers/getCldVideoUrl';

describe('Cloudinary', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  
  describe('getCldVideoUrl', () => {
    it('should pass', () => {
      const cloudName = 'customtestcloud';

      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = cloudName;

      const url = getCldVideoUrl({
        src: 'turtle',
        width: 100,
        height: 100
      });

      expect(url).toContain(`https://res.cloudinary.com/${cloudName}/video/upload/c_limit,w_100/f_auto/q_auto/turtle`);
    });
  });
})
