import { getStatusService, getVersionService } from '../services/status'

export const getStatus = (req, res) => {
  res.json(getStatusService(req))
}

export const getVersion = (req, res) => {
  res.json(getVersionService())
}

