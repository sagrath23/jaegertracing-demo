import { doOperationService } from '../services/operations'

export const doOperation = (req, res) => {
  const { tracer } = req;
  const rootSpan = tracer.startSpan('operations-controller')
  const { firstOperand, secondOperand, operation } = req.query
  const serviceResult = doOperationService(parseInt(firstOperand), parseInt(secondOperand), operation, rootSpan, tracer)

  rootSpan.log({
    event: 'service result',
    value: serviceResult
  })

  rootSpan.finish()

  res.json(serviceResult)
}
