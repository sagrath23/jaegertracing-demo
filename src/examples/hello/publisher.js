import express from 'express'
import { Tags, FORMAT_HTTP_HEADERS } from 'opentracing'
import { initTracer } from '../../instruments/tracer'

const app = express()
const tracer = initTracer('publisher-service')

const port = 2998

app.listen(port, () => {
    console.log(`publisher listening on port ${port}`)
})

app.get('/publish', (req, res) => {
    const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)
    const span = tracer.startSpan('http_server', {
        childOf: parentSpanContext,
        tags: { [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER }
    })

    const { query: { greeting } }= req

    span.log({
        event: 'publish',
        value: greeting
    })

    console.log(greeting, 'greeting published')

    span.log({
        event: 'finish publish'
    })

    span.finish()

    res.send('published!!!')
})