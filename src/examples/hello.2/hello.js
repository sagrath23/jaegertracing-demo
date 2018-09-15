import { log } from '../../instruments/log'

const formatString = log((stringToFormat) => (`Hello, ${stringToFormat}`))

const logString = (stringToLog) => (console.log(stringToLog))

const helloTo = process.argv[2]
logString(formatString(helloTo))