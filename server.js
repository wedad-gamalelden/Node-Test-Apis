// console.log("hello");
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/ProductRoute' )
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')


const app = express()


const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

 
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
    // throw new Error('fake error');
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
  res.send('Hello to blog api!')
})

app.use(errorMiddleware);

mongoose.set('strictQuery', false)

mongoose
.connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
      })
}).catch((error) =>{
    console.log(error);
})