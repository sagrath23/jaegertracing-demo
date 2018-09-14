import { mainTracer, mainSpan, traceClassFunction, traceClassMethod } from '../instruments/trace'

class Logger {
  @traceClassMethod()
  printString(stringToPrint) {
    console.log(stringToPrint)
  }
}
class Formatter {
  @traceClassFunction()
  formatString(stringToFormat) {
    return `Hello, ${stringToFormat}`
  }
}

const helloTo = process.argv[2]
const formatter = new Formatter()
const logger = new Logger()
logger.printString(formatter.formatString(helloTo))
mainSpan.finish()
mainTracer.close()
