import { version } from '../../../package.json'

export const getStatus = () => {
    return { status: 'OK' }
}

export const getVersion = () => {
    return { version }
}