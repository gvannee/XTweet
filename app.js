

import express, { json } from 'express';
import routes from './router.js';
import cors from 'cors';

import cookieParser from 'cookie-parser'; 
import multer, { diskStorage } from 'multer';


import pkg from 'mongoose';
const { connect, connection } = pkg;

import dotenv from 'dotenv';

dotenv.config({ path: 'local.env' })


//mongodb://localhost:27017
const app = express();
//middleware parse json

//TODO: connect to mongodb server
connect(
  `mongodb+srv://admin:admin@xtweet.cim5loe.mongodb.net/XTweet`,
);

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(json());

//TODO: open CORS 
app.use(cors({
  
  credentials: true,
  origin: "http://localhost:3000"
}))

app.use(cookieParser());

//route 
routes(app);

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage })

app.post('/upload', upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).send(file?.filename);
})

//listen on port 3000
const server = app.listen(8080, () => {
  console.log("Listening on port 3000");
})

