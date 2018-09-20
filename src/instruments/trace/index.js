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
