import { describe, it, expect } from 'vitest';
import { getVideoPlayerOptions } from '@cloudinary-util/url-loader';

import { getPlayerTransformation } from '../../src/components/CldVideoPlayer/getPlayerTransformation';

const config = { cloud: { cloudName: 'test' } };

function getTransformation(props) {
  const playerOptions = getVideoPlayerOptions(props, config);
  return getPlayerTransformation(props, playerOptions.transformation);
}

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

    it('should combine the transformation into one object when there is an aspectRatio', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        transformation: { effect: 'sepia' }
      })).toEqual({ quality: 'auto', effect: 'sepia' });
    });

    it('should combine into one object when there is an aspectRatio and no transformation', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9'
      })).toEqual({ quality: 'auto' });
    });

    // The crop mode is passed to the player separately, not as part of the transformation
    it('should combine into one object with an aspectRatio, crop mode and quality', () => {
      expect(getTransformation({
        src: 'turtle',
        aspectRatio: '16:9',
        cropMode: 'fill',
        quality: 50
      })).toEqual({ quality: 50 });
    });

    it('should keep the transformation array when the caller passes an array', () => {
      const props = {
        src: 'turtle',
        aspectRatio: '16:9',
        transformation: [{ effect: 'sepia' }, { width: 300 }]
      };

      expect(getTransformation(props)).toEqual([{ quality: 'auto' }, { effect: 'sepia' }, { width: 300 }]);
    });
  });
});
