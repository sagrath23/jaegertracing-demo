import { getStatus, getVersion } from '../../domains/status'

export const getStatusService = () => {
    return getStatus()
}

export const getVersionService = () => {
    return getVersion()
}

// TODO: figure out how to create here a new span