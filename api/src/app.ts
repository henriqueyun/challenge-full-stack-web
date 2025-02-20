import express from 'express'

const app = express()

app.get('/health', (_, res) => {
        res.send('Health Ok')
})

export default app