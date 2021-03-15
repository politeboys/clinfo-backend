const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const app = express()
app.use(cors())
// app.use(bodyParser.json())
const uri = "mongodb+srv://mukimbilla:alsk@1234@cluster0.x1mdc.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello Word second")
});

// 1 START GET REQUEST FOR EXCEL SHEET
app.get('/getexcel', (req, res) => {
    client.connect(err => {
        const collection = client.db("onlineStore").collection("excel");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(documents)
            }
        })
        // client.close();
    });
})
// END OF GET REQUEST FOR EXCEL SHEET



// 1.1 START POST REQUEST FOR EXCEL SHEET
app.post('/postexcel', (requ, res) => {
    const user = requ.body
    client.connect(err => {
        const collection = client.db("onlineStore").collection("excel");
        collection.insertMany(user, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user");
            }
        })
        client.close();
    });
    res.send(user)
})
// END OF POST REQUEST FOR EXCEL SHEET



// 2 START GET REQUEST FOR buying LEAD
app.get('/getbuylead', (req, res) => {
    client.connect(err => {
        const collection = client.db("onlineStore").collection("buylead");
        collection.find().toArray((err, documents) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(documents)
            }
        })
        // client.close();
    });
})
// END OF GET REQUEST FOR buying LEAD





// 2.1 START POST REQUEST FOR buying LEAD
app.post('/postbuylead', (requ, res) => {
    const user = requ.body
    user.date = new Date()
    client.connect(err => {
        const collection = client.db("onlineStore").collection("buylead");
        collection.insertOne(user, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user", user);
            }
        })
        client.close();
    });
    res.send(user)
})
// END OF POST REQUEST FOR buying LEAD





// 2.2 START update increment REQUEST FOR buying LEAD
app.post('/incrementbuylead', (requ, res) => {
    const user = requ.body
    const email = user.email
    const quantity = user.quantity
    console.log(user)

    client.connect(err => {
        const collection = client.db("onlineStore").collection("buylead");
        collection.update({ email }, { $inc: { quantity: quantity } }, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user", user);
            }
        })
        client.close();
    });
    res.send(user)
})
// 2.1 END update increment REQUEST FOR buying LEAD




// 2.3 START update Decrement REQUEST FOR buying LEAD
app.post('/decrementbuylead', (requ, res) => {
    const user = requ.body
    const email = user.email
    const selected = user.selected
    console.log(user)

    client.connect(err => {
        const collection = client.db("onlineStore").collection("buylead");
        collection.update({ email }, { $inc: { quantity: -selected } }, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user", user);
            }
        })
        client.close();
    });
    res.send(user)
})
// 2.1 END update Decrement REQUEST FOR buying LEAD




// 3 START GET REQUEST FOR ADD TO CARD
app.get('/getaddtocard/:userUID', (req, res) => {
    const userUID = req.params.userUID
    
    client.connect(err => {
        const collection = client.db("onlineStore").collection("addtocard");
        collection.find({userUID}).toArray((err, documents) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(documents)
            }
        })
        // client.close();
    });
})
// END OF GET REQUEST FOR ADD TO CARD





// 3.1 START POST REQUEST FOR ADD TO CARD
app.post('/postaddtocard', (requ, res) => {
    const user = requ.body
    // user.date = new Date()

    client.connect(err => {
        const collection = client.db("onlineStore").collection("addtocard");
        collection.insertOne(user, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user", user);
            }
        })
        client.close();
    });
    res.send("Bangladesh", user)
})
// END OF POST REQUEST FOR ADD TO CARD




// 3.2 END OF UPDATE REQUEST FOR ADD TO CARD
app.post('/updateaddtocard', (requ, res) => {
    const allData = requ.body
    const email = allData.userUID
    const data = allData.usersSavedData
    const date = allData.date
    const selectedAmaunt = allData.selectedAmaunt

    client.connect(err => {
        const collection = client.db("onlineStore").collection("addtocard");
        collection.update({ userUID: email }, {
            $addToSet: {
                usersSavedData: {
                    $each: data,
                },
                date: {
                    $each: date,
                },
                selectedAmaunt: {
                    $each: selectedAmaunt,
                }
            }
        }, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("user", data);
            }
        })
        client.close();
    });
    res.send("Bangladesh", user)
})
// END OF UPDATE REQUEST FOR ADD TO CARD




let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Listening to the port", port);
})