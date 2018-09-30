import { version } from '../../../package.json'
import { trace } from '../../instruments/trace'

const status = () => {
    return { status: 'RUNNING' }
}

export const getStatus = trace('main-tracer')(status)

export const getVersion = () => {
    return { version }
}
