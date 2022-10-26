var assert = require('assert');
var cropping = require('../cropping.js');

describe('cropping', function() {
    describe('crop', function() {
        it('should return a cropped image', function() {
            var img = cropping.crop('test.jpg', 0, 0, 100, 100);
            assert.equal(img, 'cropped.jpg');
        });
    });
});
