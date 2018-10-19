import { doOperation } from '../../domains/operations'
import { trace } from '../../instruments/trace'
import { Tags } from 'opentracing'

export const doOperationInstrumentedService = (...params) => {
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
  const domainResult = doOperation(tracer, serviceSpan, firstOperand, secondOperand, operation)
  serviceSpan.log({
    event: 'domain result',
    value: domainResult
  })
  serviceSpan.finish()

  return domainResult
}

const useOperationDomain = (...args) => {
  return doOperation(...args)
}

export const doOperationService = trace()(useOperationDomain)
