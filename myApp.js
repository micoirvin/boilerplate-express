const bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();


console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use("/", bodyParser.urlencoded({extended: false}));

app.use("/", (req, res, next) => {
    let message = `${req.method} ${req.path} - ${req.ip}`;
    console.log(message);
    next();
});

app.get("/", (req, res) => {
    // res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase")
        message = message.toUpperCase();
    res.json({
        message: message
    });
});

app.get("/now", (req, res, next) => {
    req.time = (new Date()).toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    });
}
);

app.get("/:word/echo", (req, res, next) => {
    const word = req.params.word;
    res.json({
        echo: word 
    });
});

app.get("/name", (req, res, next) => {
    const first = req.query.first;
    const last = req.query.last;
    res.json({
        name: first + " " + last
    });
});

app.post("/name", (req, res, next) => {
    const first = req.body.first;
    const last = req.body.last;
    res.json({
        name: first + " " + last
    });
});

// possible app.route(path).get(handler).post(handler)


















 module.exports = app;
