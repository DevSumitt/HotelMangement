const dns = require('dns');
dns.setServers(['8.8.8.8', '4.2.2.2']);

const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');
const myDB = require('./config/db');
const studentroutes = require('./routes/employe-routes');
const sessioninfo = require("./config/session");

const app = express();

myDB();

app.use(express.json()); 
app.use(cors({
    origin: "https://hotel-mangement-lake.vercel.app",
    credentials: true
}));
app.use(sessioninfo);

// Routes
app.get("/test", (req, res) => {
    res.json({ msg: "api is working....." });
});

app.use("/", studentroutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
