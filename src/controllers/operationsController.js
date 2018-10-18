import { doOperationService } from '../services/operations'

export const doOperation = (req, res) => {
  const { firstOperand, secondOperand, operation } = req.query
  res.json(doOperationService(parseInt(firstOperand), parseInt(secondOperand), operation))
}
