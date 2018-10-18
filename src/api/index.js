import { Router } from 'express'
import { getStatus, getVersion } from '../controllers/statusController'
import { doOperation } from '../controllers/operationsController'

export default ({config}) => {
    let api = Router()

    api.get('/', getStatus)

    api.get('/version', getVersion)

    api.get('/do', doOperation)

    return api
}
