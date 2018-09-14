import { traceClassMethod } from '../instruments/trace'

class Formatter {
  @traceClassMethod()
  formatString(stringToFormat) {
    return `Hello, ${stringToFormat}`
  }
}

const helloTo = process.argv[2]
const formatter = new Formatter()
console.log(formatter.formatString(helloTo))