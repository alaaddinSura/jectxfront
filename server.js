const express = require('express')
const serveStatic = require("serve-static")
const path = require('path')

app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

// Handle all routes by serving 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3005

app.listen(port)