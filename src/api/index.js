import { Router } from 'express'
import { getStatus } from '../controllers/statusController'

export default ({config}) => {
    let api = Router()

    api.get('/', getStatus)

    return api
}