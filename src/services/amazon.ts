
export let fs = require('fs');
export let path = require('path');
export let AWS = require('aws-sdk');

/** ***************************************************************
 *
 * Integration with amazonWS server, using the idea of ​​S3 buckets
 * 
 ******************************************************************/

/* Configurando servidor Amazon S3 */
AWS.config.update({
    accessKeyId: process.env.AMAZON_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_SECRET_KEY
});

var s3 = new AWS.S3();
var filePath = "./src/uploads/";

/**
  * Sends a file to the amazon server
  * @param fileName 
*/
export let upToAmazon = function upToAmazon(fileName){

    console.log('chamou upToAamazon');
    console.log('fileName: ',fileName);

    var paramsS3 = {
        Bucket: 'iohan-test-youper',
        Body: fs.createReadStream(filePath + fileName),
        Key: "folder/" + Date.now() + "_" + path.basename(filePath + fileName)
    };
    
    s3.upload(paramsS3, function (err, data) {
        
        // Handle error
        if (err) {
            console.log("Error", err);
        }
    
        // Success
        if (data) {
            console.log("Uploaded in:", data.Location);
        }

    });
}
