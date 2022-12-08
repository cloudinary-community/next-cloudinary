import { constructCloudinaryUrl, getPublicId, getTransformations, createPlaceholderUrl } from '../../src/lib/cloudinary';

// Mock console.warn() so we can see when it's called
global.console = {
  ...global.console,
  warn: jest.fn()
}

describe('Cloudinary', () => {
  afterEach(() => {
    // Clears the state of console.warn, in case multiple tests want to monitor it
    jest.restoreAllMocks()
  });

  describe('constructCloudinaryUrl', () => {
    it('should create a Cloudinary URL', () => {
      const cloudName = 'customtestcloud';
      const url = constructCloudinaryUrl({
        options: {
          src: 'turtle',
          width: 100,
          height: 100
        },
        config: {
          cloud: {
            cloudName
          }
        }
      });
      expect(url).toBe(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/f_auto/q_auto/turtle`);
    });

    it('should create a Cloudinary URL with custom quality and format options', () => {
      const format = 'png';
      const quality = 75;
      const cloudName = 'customtestcloud';
      const url = constructCloudinaryUrl({
        options: {
          src: 'turtle',
          width: 100,
          height: 100,
          format,
          quality
        },
        config: {
          cloud: {
            cloudName
          }
        }
      });
      expect(url).toBe(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/f_${format}/q_${quality}/turtle`);
    });
  });

  describe('getPublicId', () => {
    it('Just returns a non-Cloudinary url', () => {
      const src = 'https://google.com';
      expect(getPublicId(src)).toBe(src)
    });

    it('Just returns the public ID of a Cloudinary URL 1 folder deep', () => {
      const publicId = 'turtle';
      const src = `https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/${publicId}`;
      expect(getPublicId(src)).toBe(publicId);
    });

    it('Just returns the public ID of a Cloudinary URL 1 folder deep', () => {
      const publicId = 'images/turtle';
      const src = `https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/${publicId}`;
      expect(getPublicId(src)).toBe(publicId);
    });

    it('Just returns the public ID of a Cloudinary URL 2 folders deep', () => {
      const publicId = 'app/images/turtle';
      const src = `https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/${publicId}`;
      expect(getPublicId(src)).toBe(publicId);
    });

    it('Returns invalid Cloudinary url with a warning', () => {
      const src = 'https://res.cloudinary.com';
      expect(getPublicId(src)).toBe(src)
      expect(console.warn)
        .toBeCalledWith(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudinary image url.`)
    });
  });

  describe("getTransformations", () => {
    it("gets a non-Cloudinary url", () => {
      const src = "https://google.com";
      expect(getTransformations(src, true)).toEqual([]);
    });

    it("returns the transformations of a Cloudinary URL with a single transformation", () => {
      const src = `https://res.cloudinary.com/test-cloud/image/upload/w_960/v1/app/images/turtle`;
      expect(getTransformations(src, true)).toEqual(["w_960"]);
    });

    it("returns the transformations of a Cloudinary URL with multiple transformations", () => {
      const src = `https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/v1/app/images/turtle`;
      expect(getTransformations(src, true)).toEqual(["c_limit", "w_960"]);
    });

    it("returns the transformations of a Cloudinary URL with multiple transformations with / delimiter", () => {
      const src = `https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/app/images/turtle`;
      expect(getTransformations(src, true)).toEqual(["c_limit","w_960","f_auto","q_auto"]);
    });

    it("Returns invalid url with a warning", () => {
      const src = 245;
      expect(() => {getTransformations(src, true)}).toThrow(Error);
      expect(() => {getTransformations(src, true)}).toThrow(`Invalid src of type number`);
    });
  });

  describe('createPlaceholderUrl', () => {
    it('should create a placeholder URL with default settings', () => {
      const cloudName = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle',
        config: {
          cloud: {
            cloudName
          }
        }
      });
      expect(url).toBe(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/f_auto/q_1/turtle`);
    });

    it('should create a placeholder URL in grayscale', () => {
      const cloudName = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle',
        placeholder: 'grayscale',
        config: {
          cloud: {
            cloudName
          }
        }
      });
      expect(url).toBe(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/e_grayscale/f_auto/q_1/turtle`);
    });

    it('should create a placeholder URL with a color', () => {
      const cloudName = 'customtestcloud';
      const url = createPlaceholderUrl({
        src: 'turtle',
        placeholder: 'color:blueviolet',
        config: {
          cloud: {
            cloudName
          }
        }
      });
      expect(url).toBe(`https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_100/e_grayscale/e_colorize:60,co_blueviolet/f_auto/q_1/turtle`);
    });
  });
})
