import express from 'express'
const app = express()
const port = 8888



app.get('/', (req, res, next) => {
    res.status(200).send({ greeting: 'hello' })
    next()
})

app.listen(port, () => {
    console.log(`Listening on port ... ${port}`)
})