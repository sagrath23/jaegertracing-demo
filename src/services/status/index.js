import { getStatus, getVersion } from '../../domains/status'

export const getStatusService = () => {
    return getStatus()
}

export const getVersionService = () => {
    return getVersion()
}
