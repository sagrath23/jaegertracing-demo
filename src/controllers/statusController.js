import { getStatusService, getVersionService } from '../services/status'
import { traceFunction } from '../instruments/trace'

const getStatus = (req, res) => {
  res.json(getStatusService())
}

export const getStatusController = traceFunction(getStatus)

export const getVersion = (req, res) => {
  res.json(getVersionService())
}

