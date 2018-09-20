import { getStatusService } from '../services/status'

export const getStatus = (req, res) => {
    res.json(getStatusService())
}