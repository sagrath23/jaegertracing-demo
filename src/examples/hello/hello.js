import "@babel/polyfill";
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import * as req from 'superagent'
import { initTracer } from '../../instruments/tracer'

const tracer = initTracer('hello-service')

const formatString = async (input, rootSpan) => {
  const spanHeader = {}
  const span = tracer.startSpan('format', {
    childOf: rootSpan.context(),
    [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_CLIENT
  })
  const formatterUrl = `http://localhost:2999/format?helloTo=${input}`
  // inject span in request headers
  tracer.inject(span, FORMAT_HTTP_HEADERS, spanHeader)
  const result = await req.get(formatterUrl).set(spanHeader)

  span.log({
    event: 'format result',
    value: result.text
  })
  console.log(result.text, 'da formatter result')

  span.finish()

  return result.text
}

const printHello = async (input, rootSpan) => {
  const spanHeader = {}
  const span = tracer.startSpan('publish', {
    childOf: rootSpan.context(),
    [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_CLIENT
  })
  const formatterUrl = `http://localhost:2998/publish?greeting=${input}`
  // inject span in request headers
  tracer.inject(span, FORMAT_HTTP_HEADERS, spanHeader)
  const result = await req.get(formatterUrl).set(spanHeader)

  span.log({
    event: 'publish result',
    value: result.text
  })
  console.log(result.text, 'da publisher result')

  span.finish()

  return result.text
}

const sayHello = async (helloTo) => {
  const span = tracer.startSpan('say-hello')

  span.setTag('hellot-to', helloTo)
  // span.setBaggageItem('greeting', greeting)

  try {
    const formattedString = await formatString(helloTo, span)
    const publishResult = await printHello(formattedString, span)

    span.log({
      event: 'finish span',
      value: publishResult
    })

    span.finish()

    return publishResult
  } catch (err) {
    span.setTag(Tags.ERROR, true)
    span.setTag(Tags.HTTP_STATUS_CODE, err.statusCode || 500)
    span.log({
      event: 'fail',
      value: err
    })
    span.finish()
  }
}

const [, , helloTo, greeting] = process.argv;

sayHello(helloTo, greeting);

setTimeout( e => {tracer.close();}, 12000);