import { describe, it, expect } from 'vitest';
import { getVideoPlayerOptions } from '@cloudinary-util/url-loader';

import { getPlayerTransformation } from '../../src/components/CldVideoPlayer/getPlayerTransformation';

const config = { cloud: { cloudName: 'test' } };

function getTransformation(props) {
  const playerOptions = getVideoPlayerOptions(props, config);
  return getPlayerTransformation(props, playerOptions.transformation);
}

const overlay = {
  overlay: 'text:Arial_80:Hello',
  gravity: 'south',
  y: 40,
  color: 'white'
};

describe('CldVideoPlayer', () => {
  describe('getPlayerTransformation', () => {
    it('should keep the transformation array when there is no aspectRatio', () => {
      const props = {
        src: 'turtle',
        transformation: { effect: 'sepia' }
      };

      const { transformation } = getVideoPlayerOptions(props, config);

      expect(getTransformation(props)).toEqual(transformation);
    });

    // 7.0.0 passed the transformation from getVideoPlayerOptions to the player unchanged. Merging
    // these into one step with the aspectRatio changes the delivered video, so they keep 7.0.0's.
    describe.each([
      ['an effect', { effect: 'sepia' }],
      ['a width', { width: 500 }],
      ['a height', { height: 500 }],
      ['a width and height', { width: 500, height: 500 }],
      ['a width and fill crop', { width: 500, crop: 'fill' }],
      ['a width and scale crop', { width: 500, crop: 'scale' }],
      ['a width and limit crop', { width: 500, crop: 'limit' }],
      ['a width and pad crop', { width: 500, crop: 'pad' }],
      ['a width and fit crop', { width: 500, crop: 'fit' }],
      ['a width and crop crop', { width: 500, crop: 'crop' }],
      ['a width, height and fill crop', { width: 500, height: 500, crop: 'fill' }],
      ['a crop', { crop: 'fill' }],
      ['a crop and gravity', { crop: 'fill', gravity: 'auto' }],
      ['its own aspect ratio', { aspect_ratio: '1:1', crop: 'fill' }],
      ['a quality', { quality: 50 }],
      ['a text overlay without dimensions', overlay]
    ])('with an aspectRatio and a transformation object with %s', (_, transformation) => {
      it('should keep the transformation array as in 7.0.0', () => {
        const props = {
          src: 'turtle',
          aspectRatio: '16:9',
          transformation
        };

        expect(getTransformation(props)).toEqual(getVideoPlayerOptions(props, config).transformation);
        expect(getTransformation(props)).toEqual([{ quality: 'auto' }, transformation]);
      });

      it('should keep the transformation array as in 7.0.0 with a crop mode', () => {
        const props = {
          src: 'turtle',
          aspectRatio: '16:9',
          cropMode: 'fill',
          transformation
        };

        expect(getTransformation(props)).toEqual([{ quality: 'auto' }, transformation]);
      });

      it('should keep the transformation array as in 7.0.0 with a quality', () => {
        const props = {
          src: 'turtle',
          aspectRatio: '16:9',
          quality: 50,
          transformation
        };

        expect(getTransformation(props)).toEqual([{ quality: 50 }, transformation]);
      });
    });

    it('should combine into one object when there is an aspectRatio and no transformation', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9'
      })).toEqual({ quality: 'auto' });
    });

    it('should combine into one object when there is an aspectRatio and an empty transformation object', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        transformation: {}
      })).toEqual({ quality: 'auto' });
    });

    it('should combine into one object when there is an aspectRatio and an empty transformation array', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        transformation: []
      })).toEqual({ quality: 'auto' });
    });

    it('should combine into one object when there is an aspectRatio and a quality', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        quality: 50
      })).toEqual({ quality: 50 });
    });

    // With a crop mode, the player puts the crop in the aspectRatio step, so the poster loads as in
    // 7.0.0. Merging would put g_auto (smart) in a step with q_auto, which Cloudinary rejects.
    it.each(['fill', 'pad', 'smart'])('should keep the transformation array as in 7.0.0 with an aspectRatio and the %s crop mode', (cropMode) => {
      const props = {
        src: 'turtle',
        aspectRatio: '16:9',
        cropMode
      };

      expect(getTransformation(props)).toEqual(getVideoPlayerOptions(props, config).transformation);
    });

    it('should keep the transformation array as in 7.0.0 with an aspectRatio, crop mode and quality', () => {
      const props = {
        src: 'turtle',
        aspectRatio: '16:9',
        cropMode: 'fill',
        quality: 50
      };

      expect(getTransformation(props)).toEqual(getVideoPlayerOptions(props, config).transformation);
    });

    // The poster is passed to the player as posterOptions, not as part of the transformation
    it.each([
      ['string', 'https://res.cloudinary.com/demo/image/upload/sample.jpg'],
      ['object', { tint: 'equalize:80:blue:blueviolet' }]
    ])('should combine into one object with an aspectRatio and a poster %s', (_, poster) => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        poster
      })).toEqual({ quality: 'auto' });
    });

    it('should keep the transformation array when the caller passes an array', () => {
      const props = {
        src: 'turtle',
        aspectRatio: '16:9',
        transformation: [{ effect: 'sepia' }, { width: 300 }]
      };

      expect(getTransformation(props)).toEqual([{ quality: 'auto' }, { effect: 'sepia' }, { width: 300 }]);
    });

    it('should keep the transformation array when the first step has more than a quality', () => {
      const transformation = [{ quality: 'auto', format: 'mp4' }];

      expect(getPlayerTransformation({ aspectRatio: '16:9' }, transformation)).toBe(transformation);
    });
  });
});
