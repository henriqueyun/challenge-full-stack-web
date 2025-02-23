import express from 'express'
import router from './router'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/health', (_, res) => {
        res.send('Health Ok')
})

export default app