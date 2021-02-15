const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()
app.use(cors())
app.use(bodyParser.json())
const uri = "mongodb+srv://mukimbilla:alsk@1234@cluster0.x1mdc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



app.get("/", (req, res) => {
    res.send("Hello Word second")
});









let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Listening to the port",port);
})