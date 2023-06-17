import express from 'express';
import { Request, Response } from 'express';
import { routes } from './router';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';



require('dotenv').config({ path: 'local.env' })


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

app.use(cookieParser());

//route 
routes(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage: storage })

app.post('/upload', upload.single("file"), (req: Request, res: Response) => {
  const file = req.file
  res.status(200).send(file?.filename);
})

//listen on port 3000
const server = app.listen(8080, () => {
  console.log("Listening on port 3000");
})

let io = require('socket.io')(server)
io.once('connection', (socket: any) => {
  console.log(`New connection ${socket.id}`);
  
})

