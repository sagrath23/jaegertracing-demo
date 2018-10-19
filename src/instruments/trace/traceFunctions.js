let spanName
let parentSpan
let tracer

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
    const [req] = args
    const { tracer } = req
    // create a span 
    const span = tracer.startSpan(functionName)
    span.setTag(`${functionName} parameters`, req.body)
    try {
      const result = functionToWrap.apply(this, args)
      span.log({
        event: `${functionName} result`,
        value: result
      })
      span.finish()
      return result
    } catch(err)  {
      //handle any exception here
      // TODO: handle span finish & send error here
      throw err
    }
  }
}

export const trace = (spanName, parentSpan, tracer) => {
  return wrapFunction
}
