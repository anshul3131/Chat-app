const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth")
const msgRoutes = require("./routes/msg")
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/messages',msgRoutes)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connection successfull.")
}).catch((err)=>{
    console.log(`Error connecting to Database : ${err}`)
});



const server = app.listen(process.env.PORT,()=>{
    console.log(`App listening on PORT ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  