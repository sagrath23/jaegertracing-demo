import { getStatus, getVersion } from '../status'
import { version } from '../../../package.json'

//TODO: mock tracer & span to pass it on each decorated function to test
describe('status domain tests', () => {
  it('should return an status object', () => {
    expect(getStatus()).toMatchSnapshot()
  })

  it('should return the version of the service', () => {
    expect(getVersion()).toEqual({ version })
  })
})