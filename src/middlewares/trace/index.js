import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import { initTracer } from '../../instruments/tracer'

// trace middleware extract a span from req.header (if it was sent to the service),
// create a new span and inject in req properties to make it available to next functions
export const tracerMiddleware = (req, res, next) => {
  const tracer = initTracer('api-services')
  // TODO: tracer.extract didn't return null when a span isn't sent
  // check if this is an issue of jaeger-client package
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  let span

  console.log(parentSpanContext, 'passing for middleware...')

  // this is a workaround
  if (parentSpanContext._traceId) {
    console.log('have a parent span!!!!')
    span = tracer.startSpan('http_server', {
      childOf: parentSpanContext,
      tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
    })
  } else {
    span = tracer.startSpan('tracer-middleware')
  }
  span.log({event: 'api-middleware call', value: { body: req.body, query: req.query, params: req.params}})
  //set tracer to req
  req.tracer = tracer
  //and add span to req
  req.rootSpan = span
  //and execute next middleware
  next()
}
