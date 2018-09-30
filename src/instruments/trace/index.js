import { initTracer as initJaegerTracer } from 'jaeger-client'

export const initTracer = (serviceName) => {
  const config = {
    serviceName,
    sampler: {
      type: 'const',
      param: 1
    },
    reporter: {
      logSpans: true
    }
  }

  const options = {
    logger: {
      info(msg) {
        console.info(msg)
      },
      error(msg) {
        console.error(msg)
      }
    }
  }

  return initJaegerTracer(config, options)
}

export const mainTracer = initTracer('decorator-test')
export const mainSpan = mainTracer.startSpan('app-flow')

export const traceClassFunction = () => {
  return (target, name, descriptor) => {
    const originalFunction = descriptor.value
    if (typeof originalFunction === 'function') {
      const span = mainTracer.startSpan(name, { childOf: mainSpan })
      descriptor.value = (...args) => {
        span.setTag(`${name} parameters`, args)
        try {
          const result = originalFunction.apply(this, args)
          span.log({
            event: `${name} result`,
            value: result
          })
          span.finish()
          return result
        } catch (error) {
          console.error(`Error: ${error}`)
          throw error
        }
      }
    }
  }
}

export const traceClassMethod = () => {
  return (target, name, descriptor) => {
    const originalFunction = descriptor.value
    if (typeof originalFunction === 'function') {
      const span = mainTracer.startSpan(name, { childOf: mainSpan })
      descriptor.value = (...args) => {
        span.setTag(`${name} parameters`, args)
        try {
          originalFunction.apply(this, args)
          span.log({ event: `${name} executed` })
          span.finish()
        } catch (error) {
          console.error(`Error: ${error}`)
          throw error
        }
      }
    }
  }
}

export const traceFunction = (functionToTrace) => {
  const functionName = functionToTrace.name

  return (...args) => {
    const [req] = args
    const parentSpan = req.span
    if (parentSpan) {
      parentSpan.log({ event: 'some'})
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
  console.log(params)
  return wrapFunction
}
