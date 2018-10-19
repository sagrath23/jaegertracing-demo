import { Tags } from 'opentracing'

export const doOperation = (...args) => {
  const operations = {
    add,
    substract,
    multiply,
    divide
  }
  const [firstOperand, secondOperand, operation, serviceSpan, tracer] = args
  const domainSpan = tracer.startSpan('operation-domain', {
    childOf: serviceSpan.context(),
    tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
  })
  domainSpan.log({
    event: 'calculating result in domain',
    value: {
      firstOperand,
      secondOperand,
      operation
    }
  })

  const result = operations[operation](firstOperand, secondOperand)
  
  domainSpan.log({
    event: 'domain result',
    value: result
  })
  domainSpan.finish()
  return { result };
}

const add = (firstOperand, secondOperand) => (firstOperand + secondOperand)

const substract = (firstOperand, secondOperand) => (firstOperand - secondOperand)

const multiply = (firstOperand, secondOperand) => (firstOperand * secondOperand)

const divide = (firstOperand, secondOperand) => (firstOperand / secondOperand)
