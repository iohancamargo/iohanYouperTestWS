import * as fs from 'fs';
import * as del from 'del';
import * as path from 'path';
import { Image } from './src/modelsBD/image';
import { Message } from './src/modelsBD/messages';
import { upToAmazon } from './src/services/amazon';
import { UPLOAD_PATH, app, upload } from './server';


/** *************************************
  *
  * [IMG] Routes for image manipulation
  * 
****************************************/

/**
  * Store a new image and send to amazonWS
  * @param image File -> File to upload
  * @param desc String -> Description of img
  * @return jsonObject ModelDB/Image
*/
app.post('/images', upload.single('image'), (req, res, next) => {

    if(req.file == undefined){
        return res.sendStatus(400);
    }

    let newImage = new Image();
    newImage.desc = req.body.desc;
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;

    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        console.log('call up to amazon');
        upToAmazon(req.file.originalname);

        res.status(201).send({ newImage });
    });

});

/**
  * Return all images in server
  * @return array of json <Image>
*/
app.get('/images', (req, res, next) => {
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }

        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    })
});

/**
  * Return one image by id request
  * @param
  * @return jsonObject of Image Model
*/
app.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;

    Image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});

/**
  * Returns last image registered for user
  * @return jsonObject
*/
app.get('/user_image', (req, res, next) => {

    Image.find({}, '-__v').sort({ $natural: -1 }).limit(1).lean().exec(function (err, result) {
        if (err) {
            res.sendStatus(400);
        };

        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, result[0].filename)).pipe(res);
    });
});

/**
  * Delete image by id
  * @param id -> Id of image
*/
app.delete('/images/:id', (req, res, next) => {
    let imgId = req.params.id;

    Image.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            res.sendStatus(400);
        }

        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
});


/******************************************** 
  * 
  * [MESSAGES] Routes for handling messages
  * 
*********************************************/

/**
  * Store a new imagem by request parameters
  * @param desc String -> Description of image
  * @param read Boolean -> Indicates whether message has already been read
  * @param animation Boolean -> Indicates if message has animation effect
  * @param typeOfAnimation String -> Indicates the type of image animation
  * @return jsonObject ModelsBD/Message
*/
app.post('/message', upload.single('image'), (req, res, next) => {
    let newMessage = new Message();

    newMessage.read = false;
    newMessage.desc = req.body.desc;
    newMessage.title = req.body.title;
    newMessage.animation = req.body.animation;
    newMessage.typeOfAnimation = req.body.typeOfAnimation;

    newMessage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }

        res.status(201).send({ newMessage });
    });

});

/**
  * Returns the last registered user image.
  * @return Array of jsonObject Message
*/
app.get('/messages', (req, res, next) => {

    Message.find({}, '-__v').lean().exec((err, messages) => {
        if (err) {
            res.sendStatus(400);
        }

        res.json(messages);
    })
});

/**
 * Changes message to read
 * @param id -> Id of message
 * return jsonObject of Message
*/
app.put('/message_up_to_read/:id', (req, res, next) => {

    Message.findById(req.params.id, function (err, message) {
        if (err){
            res.sendStatus(400);
        }else {

            message.read = true;
            message.save(function (err) {
                if (err){                    
                    res.sendStatus(400);
                }
                else{
                    res.status(201).send({ message });
                }
            });
        }
    });

});

/************************************************
  * 
  * [Devices] Routes for handling devices info
  * 
************************************************/

/**
  * Store a new imagem by request parameters
  * @param desc String -> Description of image
  * @param read Boolean -> Indicates whether message has already been read
  * @param animation Boolean -> Indicates if message has animation effect
  * @param typeOfAnimation String -> Indicates the type of image animation
  * @return jsonObject ModelsBD/Message
*/
app.post('/message_up_to_read', (req, res, next) => {

    Message.findById(req.params.id, function (err, message) {
        if (err){
            res.sendStatus(400);
        }else {

            message.read = true;
            message.save(function (err) {
                if (err){                    
                    res.sendStatus(400);
                }
                else{
                    res.status(201).send({ message });
                }
            });
        }
    });

});