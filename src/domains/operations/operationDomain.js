export const doOperation = (...args) => {
  const operations = {
    add,
    substract,
    multiply,
    divide
  }
  const [firstOperand, secondOperand, operation] = args
  const result = operations[operation](firstOperand, secondOperand)
  
  return { result };
}

const add = (firstOperand, secondOperand) => (firstOperand + secondOperand)

const substract = (firstOperand, secondOperand) => (firstOperand - secondOperand)

const multiply = (firstOperand, secondOperand) => (firstOperand * secondOperand)

const divide = (firstOperand, secondOperand) => (firstOperand / secondOperand)