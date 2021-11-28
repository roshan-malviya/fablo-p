const express = require("express")
const db = require('./config/db')

const app = express()
db()
app.use(express.json({extended : false}))
// 
app.use('/add',require('./routs/students'))
app.use('/get',require('./routs/students'))

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))