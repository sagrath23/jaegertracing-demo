import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import { initTracer } from '../../instruments/trace'

// trace middleware extract a span from req.header (if it was sent to the service),
// create a new span and inject in req properties to make it available to next functions
export const traceMiddleware = (req, res, next) => {
  const tracer = initTracer('api-service')
  // TODO: tracer.extract didn't return null when a span isn't sent
  // check if this is an issue of jaeger-client package
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  let span;

  // this is a workaround
  if (parentSpanContext._traceId) {
    span = tracer.startSpan('http_server', {
      childOf: parentSpanContext,
      tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
    });
  } else {
    span = tracer.startSpan('http_server')
  }
  span.log({event: 'api-middleware call', value: req})
  //set span to req
  req.span = span
  //and execute next middleware
  next()
}
