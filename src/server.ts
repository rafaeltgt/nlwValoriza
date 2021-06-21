import express from "express"

const app = express()

app.listen(3000, () => { console.log('Server is running NLW') })

app.get('/teste', (request, response) => {
    return response.send('ola')
})

app.post('/teste-post', (request, response) => {
    return response.send('ola post')
})