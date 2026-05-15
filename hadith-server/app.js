const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const dotenv  = require ("dotenv");
const router = require('./routes')
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();


app.use(express.static(__dirname + '/public'));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// const uploadStorage = multer({ storage: storage })

// // Single file
// app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })

//Multiple files
// app.post("/upload/multiple", uploadStorage.array("file", 10), (req, res) => {
//   console.log(req.files)
//   return res.send("Multiple files")
// })
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB!!!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use(express.json());

app.use('/', router)

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.listen(4040, function () {
    console.log('Example app listening on port 4040!');
});