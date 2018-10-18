import { doOperation } from '../../domains/operations'

export const doOperationService = (firstOperand, secondOperand, operation) => {
    return doOperation(firstOperand, secondOperand, operation)
}
