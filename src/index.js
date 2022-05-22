const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4500

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
