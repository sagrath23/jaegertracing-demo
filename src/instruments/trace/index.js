import { initTracer as initJaegerTracer } from 'jaeger-client'

const initTracer = (serviceName) => {
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

export const traceClassMethod = () => {
  const tracer = initTracer('decorator-test')
  return (target, name, descriptor) => {
    const originalFunction = descriptor.value
    if (typeof originalFunction === 'function') {
      const span = tracer.startSpan(name)
      descriptor.value = (...args) => {
        span.setTag(`${name} parameters`, args)
        try {
          const result = originalFunction.apply(this, args)
          span.log({
            event: `${name} result`,
            value: result
          })
          span.finish()
          tracer.close()
          return result
        } catch (error) {
          console.error(`Error: ${error}`)
          throw error
        }
      }
    }
  }
}