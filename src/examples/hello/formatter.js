import express from 'express'
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import { initTracer } from '../../instruments/tracer'

const app = express()
const tracer = initTracer('formatter-service')

const port = 2999

app.listen(port, () => {
  console.log(`formatter listening on port ${port}`)
})

app.get('/format', (req, res) => {
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = tracer.startSpan('http_server', {
    childOf: parentSpanContext,
    tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
  })

  const { query: { helloTo } } = req

  span.log({
    event: 'format',
    value: helloTo
  })

  const greeting = `Hello, ${helloTo}`

  span.log({
    event: 'result',
    value: greeting
  })

  span.finish()

  res.send(greeting)
})