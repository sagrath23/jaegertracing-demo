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
