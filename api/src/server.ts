import app from './app'

const PORT = process.env.PORT ?? 8080

const server = app.listen(PORT, () => {
    console.log('Server listening at', PORT)
})

export default server