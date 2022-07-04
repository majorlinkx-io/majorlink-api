
require("dotenv").config()


const mongoose = require("mongoose")


const express = require("express")
const app = express()
app.use(express.json())


const cors = require("cors")
app.use(cors())

const mongoUri = process.env.DATABASE_CONNECTION
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`MongoDB server is live`)
  })

mongoose.connection.on("connected", () => {
  console.log("Connection to Majorlinkx Mongo Database established")
})
mongoose.connection.on("error", (error) => {
  console.log("Error connecting", error)
})
// routes all my api points -- (Routes to Controller to Model)
const myRoutes = require('./routes/userRoutes')
app.use('/api/users', myRoutes)

app.listen("4000", () => {
  console.log("App is listening on port 4000")
})

module.exports = app