const dns = require('dns');
dns.setServers(['8.8.8.8', '4.2.2.2']);
const dotenv = require('dotenv');
const myDB = require('./config/db');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const studentroutes = require('./routes/employe-routes');
const sessioninfo = require("./config/session");


app = express()
app.use(bodyParse.json());
myDB();
app.use(cors({
    origin: true,
    credentials: true
}))
app.get("/test",(req,res)=>{
    res.json({msg:"api is working....."})   
})
app.use(sessioninfo);
app.use("/", studentroutes);



app.listen(process.env.PORT, () => {
    console.log("Server Is working on web", process.env.PORT);
})
