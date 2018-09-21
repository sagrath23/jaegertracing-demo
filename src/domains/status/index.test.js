import { getStatus, getVersion } from '../status'
import { version } from '../../../package.json'

describe('status domain tests', () => {
  it('should return an status object', () => {
    expect(getStatus()).toMatchSnapshot()
  })

  it('should return the version of the service', () => {
    expect(getVersion()).toEqual({ version })
  })
})