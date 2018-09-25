import { Router } from 'express'
import { getStatusController, getVersion } from '../controllers/statusController'

export default ({config}) => {
    let api = Router()

    api.get('/', getStatusController)

    api.get('/version', getVersion)

    return api
}