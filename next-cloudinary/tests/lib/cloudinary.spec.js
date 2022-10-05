import { getPublicId } from "../../src/lib/cloudinary"

// Mock console.warn() so we can see when it's called
global.console = {
  ...global.console,
  warn: jest.fn()
}

describe('Cloudinary', () => {
  afterEach(() => {
    // Clears the state of console.warn, in case multiple tests want to monitor it
    jest.restoreAllMocks()
  })
  describe('getPublicId', () => {
    it('Just returns a non-Cloudinary url', () => {
      const src = 'https://google.com'
      expect(getPublicId(src)).toBe(src)
    })
    it('Returns invalid Cloudinary url with a warning', () => {
      const src = 'https://res.cloudinary.com'
      expect(getPublicId(src)).toBe(src)
      expect(console.warn)
        .toBeCalledWith(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudinary image url.`)
    })
    it.todo('Returns ID from url with transformations')
    it.todo('Returns ID from url without transformations')
  })
})
