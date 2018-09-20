import { getStatus } from '../status'
import { initTracer } from '../../instruments/trace';

describe('status domain tests', () => {
  it('should return an status object', () => {
    expect(getStatus()).toMatchSnapshot()
  })
})