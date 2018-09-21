import { getStatusService, getVersionService } from '../services/status'

export const getStatus = (req, res) => {
    res.json(getStatusService())
}

export const getVersion = (req, res) => {
    res.json(getVersionService())
}