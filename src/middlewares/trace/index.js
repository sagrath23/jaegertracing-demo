import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import { initTracer } from '../../instruments/trace'

export const traceMiddleware = (req, res, next) => {
  // check if request have a span
  const tracer = initTracer('api-service')
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  let span;
  console.log(parentSpanContext, 'ctx')
  if (parentSpanContext) {
    console.log('received span')
    span = tracer.startSpan('http_server', {
      childOf: parentSpanContext,
      tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
    });
  } else {
    console.log('no span')
    span = tracer.startSpan('http_server')
  }
  span.log({event: 'api-middleware call', value: req})
  req.span = span
  next()
}
