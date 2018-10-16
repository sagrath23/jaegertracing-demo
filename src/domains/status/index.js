import { version } from '../../../package.json'
import { trace } from '../../instruments/trace'

const status = (req) => {
    return { status: 'RUNNING' }
}

export const getStatus = trace('status-domain')(status)

export const getVersion = () => {
    return { version }
}
