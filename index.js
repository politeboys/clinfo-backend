const express = require("express")
const app = express()
let port = process.env.PORT || 4000;


app.get("/", (req, res) => {
    res.send("Hello Word")
});

app.get("/test", (req, res) => {
    res.send("Test successfull")
});

app.get("/test2", (req, res) => {
    res.send("Test2 also successfull")
});


app.listen(port, () => {
    console.log("Listening to the port",port);
})