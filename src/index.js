import { log } from './instruments/log'

const formatString = (stringToFormat) => (`Hello, ${stringToFormat}!!!`)
export const format = log()(formatString)

const helloTo = process.argv[2]
console.log(format(helloTo))