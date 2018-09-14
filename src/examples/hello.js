import { logClassMethod } from '../instruments/log'

class Formatter {
  @logClassMethod()
  formatString(stringToFormat) {
    return `Hello, ${stringToFormat}`
  }
}

const helloTo = process.argv[2]
const formatter = new Formatter()
console.log(formatter.formatString(helloTo))