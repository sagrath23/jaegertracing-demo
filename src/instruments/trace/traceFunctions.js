import { Tags } from 'opentracing'

const wrapFunction = (functionToWrap) => {
  const functionName = functionToWrap.name
  console.log(`wrapping ${functionName}`)

  return (...args) => {
    const [tracer, parentSpan, ...params] = args
    // create a span 
    const span = tracer.startSpan(functionName, {
      childOf: parentSpan.context(),
      tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
    })
    // add parameters as a tag
    span.setTag(`${functionName} parameters`, params)

    //replace parent span with current span
    args[1] = span
    // execute original function
    try {
      const result = functionToWrap.apply(this, args)
      span.log({
        event: `${functionName} result`,
        value: result
      })
      span.finish()
      return result
    } catch(err)  {
      span.setTag(Tags.ERROR, true)
      //log error
      span.log({
        event: 'throw exception',
        value: err
      })
      throw err
    }
  }
}

export const trace = () => {
  return wrapFunction
}
