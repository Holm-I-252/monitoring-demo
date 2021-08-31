const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'e9630bea93354320aa9707b49b2e737d',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const students = []
const app = express()

app.use(rollbar.errorHandler())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html files served')
})

app.post('/api/student', (req, res) => {
    const {name} = req.body
    name = name.trim()
    students.push(name)
    rollbar.log("student added", {author: "Ian", type: "manual entry"})

    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.listen(port, () => {
    console.log(`running on ${port}`)
})