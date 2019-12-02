const express = require('express')
const userRouter = require('./routers/user')
const characterRouter = require('./routers/character')
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(characterRouter)

app.listen(port, () => {
    console.log(`Server running on ports ${port}`)
})