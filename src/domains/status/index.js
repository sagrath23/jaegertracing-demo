import { version } from '../../../package.json'

export const getStatus = () => {
    return { status: 'RUNNING' }
}

export const getVersion = () => {
    return { version }
}