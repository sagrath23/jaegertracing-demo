import { Tags } from 'opentracing'
import { doOperationService } from '../services/operations'


// TODO: figure out how to instrument this in a better way
export const doOperation = (req, res) => {
  const { tracer, rootSpan } = req
  const controllerSpan = tracer.startSpan('operations-controller', {
    childOf: rootSpan.context(),
    [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
  })
  const { firstOperand, secondOperand, operation } = req.query
  const serviceResult = doOperationService(tracer, controllerSpan, parseInt(firstOperand), parseInt(secondOperand), operation)

  controllerSpan.log({
    event: 'service result',
    value: serviceResult
  })

  controllerSpan.finish()
  rootSpan.finish()

  res.json(serviceResult)
}
