import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { Tags } from 'opentracing'
import api from './api'
import config from './config.js'
import { initTracer } from './instruments/trace'
// initialize tracer for start server
const tracer = initTracer('init-service')
const span = tracer.startSpan('initialization')
span.setTag(Tags.SAMPLING_PRIORITY, 1)

// create app
let app = express()

app.server = http.createServer(app)
span.log({ event: 'created express app & server' })
// logger
app.use(morgan('dev'))
span.log({ event: 'logger attached' })
// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}))
span.log({ event: 'cors added' })

app.use(bodyParser.json({
  limit: config.bodyLimit
}))
span.log({ event: 'body limit added', value: config.bodyLimit })

// app's router
app.use('/api', api({ config }))
span.log({ event: 'routes added' })

// handle error when start server
app.server.on('error', (err) => {
  span.setTag(Tags.ERROR, true)
  span.log({
    event: 'start server failed',
    value: err
  })
  span.finish()
  tracer.close()
});

// and start it
app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
  span.log({ event: 'server runing' })
  span.finish()
  tracer.close()
});

span.log({
  event: 'starting server',
  value: config.port
})

export default app
