const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
require('../db/mongoose')

const PORT = process.env.PORT || 4500

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
