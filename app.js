const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
var mongoose = require('mongoose');
const bodyparser=require("body-parser");
const app = express();

dotenv.config({path:'./config.env'})

const DB=process.env.DATABASE;
mongoose.connect(DB, {
    usenewurlparser: true,
    //  useCreateIndex:true
      useunifiedtopology: true
    // useFindAndModify:false
  })
  .then(() => {
    console.log("Successfully connected ");
  })
  .catch((err) => {
    console.log(`can not connect to database, ${err}`);
  });

let port = process.env.PORT || 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    mobile : String
});

var contact = mongoose.model('contact', contactSchema);



app.use(express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    // const params = {}
    res.status(200).render('home.pug');
})
 app.get('/contact', (req, res)=>{
    //  const params = {}
     res.status(200).render('contact.pug');
 })

 app.post('/contact', (req, res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database ")
    });

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(process.env.PORT || 8000, function() {
    console.log('Server listening on port 8000');
    
    });
 
