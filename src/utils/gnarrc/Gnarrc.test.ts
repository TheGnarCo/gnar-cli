import mockAxios from 'jest-mock-axios'

import { Gnarrc } from '.'

describe(Gnarrc, () => {
  afterEach(() => {
    mockAxios.reset()
  })

  describe('.get()', () => {
    it('makes a GET call to the .gnarrc repo', async () => {
      const data = 'Foo'
      const file = 'foo/bar/baz.lehrman'

      Gnarrc.get(file).then(response => {
        expect(response).toBe(data)
      })

      expect(mockAxios.get).toHaveBeenCalledWith(file)

      mockAxios.mockResponse({ data })
    })
  })
})
