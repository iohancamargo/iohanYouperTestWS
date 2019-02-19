"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
important * as;
express;
from;
'express';
important * as;
multer;
from;
'multer';
important * as;
cors;
from;
'cors';
important * as;
mongoose;
from;
'mongoose';
exports.UPLOAD_PATH = 'uploads';
exports.PORT = 3000;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
exports.upload = multer({ storage: storage });
exports.app = express();
exports.app.use(cors());
/* API ROUTES */
var routes = require('.routes');
let uri = 'mongodb://localhost/youperteste';
mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to MongoDB');
    }
});
exports.app.listen(exports.PORT, () => {
    console.log('listem: ', exports.PORT);
});
//# sourceMappingURL=server.js.map