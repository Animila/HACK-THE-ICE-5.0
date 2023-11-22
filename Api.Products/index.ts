require('dotenv').config();

const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const router = require('./router')
const app = express();
const server = require('http').createServer(app)

const PORT = process.env.PORT || 3000;
const corsOptions = {
    credentials: true,
    origin: [
        "https://hackaton-yakse.ru",
        "https://www.hackaton-yakse.ru",
    ],
}


app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(corsOptions))

// app.use("/products/api", router);

const start = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start();
