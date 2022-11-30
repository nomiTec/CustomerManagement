const express = require('express')
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const con = require("./db")

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(cors({credentials: true, origin: true}));

// use Middlewares 
app.use(bodyParser.json({limit: '50mb'}));
app.use("/profileImages",express.static("profileImages"));

// router
const router = require('./router')

app.listen(port,()=>{
    console.log("server listening on port 3000")
})
app.use('/',router)