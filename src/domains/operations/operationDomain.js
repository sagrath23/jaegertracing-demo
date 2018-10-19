import { trace } from '../../instruments/trace'

export const calculate = (...args) => {
  const operations = {
    add,
    substract,
    multiply,
    divide
  }

  //if i want to instrument in detail, can use tracer & parent span to make it
  const [tracer, parentSpan, firstOperand, secondOperand, operation] = args
  
  return { result: operations[operation](firstOperand, secondOperand) }
}

const add = (firstOperand, secondOperand) => (firstOperand + secondOperand)

const substract = (firstOperand, secondOperand) => (firstOperand - secondOperand)

const multiply = (firstOperand, secondOperand) => (firstOperand * secondOperand)

const divide = (firstOperand, secondOperand) => (firstOperand / secondOperand)

export const doOperation = trace()(calculate)
