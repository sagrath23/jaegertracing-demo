import { Router } from 'express'
import { getStatus, getVersion } from '../controllers/statusController'

export default ({config}) => {
    let api = Router()

    api.get('/', getStatus)

    api.get('/version', getVersion)

    return api
}
