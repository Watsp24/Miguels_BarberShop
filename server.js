const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
//const bodyParser = require('body-parser');  this has been replaced by first 2 middleware items


const app = express()


//Middleware - get around security feature for modern browsers and malicious requests  
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) 
app.use(express.static('public'))   //points server to static file public for all features


//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)


//https://nodejs.org/api/events.html#emitteroneventname-listener
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> {
    console.log("Connected to MongoDB")
})


//Define a schema and model for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: Date,
    message: String
    
})

const Contact  = mongoose.model("Contact", contactSchema)

//Handle Form Submission Request
app.post('/submit', async (req, res) => {
    const formData =  {
        name: req.body.Name,
        email: req.body.Email,
        date: new Date(req.body.date),
        message: req.body.Message
        
    }
    try{
        const newContact = new Contact(formData)
        await newContact.save()
        res.redirect('/?success')
    }catch (error)  {
        res.redirect('/?error')
    }
    
})


app.get('/', (req, res)  => {
    res.sendFile(__dirname + '/public/index.html')
})


//start server
const PORT = 3000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server connected on ${PORT}`)
})