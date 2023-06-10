import express from 'express';
import {routes} from './router';
import mongoose from 'mongoose';
import cors from 'cors';


//mongodb://localhost:27017
const app = express();
//middleware parse json

//TODO: connect to mongodb server
mongoose.connect(
    `mongodb+srv://admin:admin@xtweet.cim5loe.mongodb.net/XTweet`, 
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json());

//TODO: open CORS 
app.use(cors({
  credentials: true,
  origin: "https://localhost:3000"
}))

//route 
routes(app);

//listen on port 3000
app.listen(8080, () => {
    console.log("Listening on port 3000");
})