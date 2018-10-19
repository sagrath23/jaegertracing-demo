import { doOperation } from '../../domains/operations'
import { Tags } from 'opentracing'

export const doOperationService = (...params) => {
  const [firstOperand, secondOperand, operation, controllerSpan, tracer] = params
  const serviceSpan = tracer.startSpan('operations-service', {
    childOf: controllerSpan.context(),
    tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
  })
  serviceSpan.log({
    event: 'passing values to domain',
    value: {
      firstOperand,
      secondOperand,
      operation
    }
  })
  const domainRresult = doOperation(firstOperand, secondOperand, operation, serviceSpan, tracer)
  serviceSpan.log({
    event: 'domain result',
    value: domainRresult
  })
  serviceSpan.finish()

  return domainRresult
}
