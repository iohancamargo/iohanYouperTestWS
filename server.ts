import * as cors from 'cors';
import * as multer from 'multer';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { scheduleVerifyMessages } from './src/schedulers/messages';

/* Read .env files for config */
const dotenv = require('dotenv');
dotenv.config();

// Generell properties
export let PORT = process.env.PORT;
export let UPLOAD_PATH = process.env.UPLOAD_PATH;

// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

export let upload = multer({ storage: storage });

// Initialise App
export const app = express();
app.use(cors());

// Load our routes
var routes = require('./routes');

// Setup Database
let uri = 'mongodb://localhost/youpertest';

mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDb');
    }
});

// App startup
app.listen(PORT, function () {
    console.log('listening on port: ' + PORT);
});

/* Scheduler messages */
scheduleVerifyMessages();