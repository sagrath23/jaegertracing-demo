import { initTracer } from '../tracer'

export const traceFunction = (functionToTrace) => {
  const functionName = functionToTrace.name

  return (...args) => {
    const [req] = args
    const parentSpan = req.span
    if (parentSpan) {
      parentSpan.log({ event: 'some' })
      const result = functionToTrace.apply(this, args)
      console.log(`result: ${result}`)

      return result
    }
  }
}

const wrapFunction = (functionToWrap) => {
  const functionName = functionToWrap.name
  console.log(`wrapping ${functionName}`)

  return (...args) => {
    console.log(args, 'args')
    const result = functionToWrap.apply(this, args)

    return result
  }
}

export const trace = (...params) => {
  console.log('tracing functions...')
  console.log(params, 'params')
  return wrapFunction
}
