/***********************************************
  * 
  * Mount schedules messages here =]
  * 
***********************************************/

import { Message } from '../modelsBD/messages';
export let scheduler = require('node-schedule');

/**
  * Every minute is checked if all the messages have been read, 
  * if positive, new messages are registered to list on the mobile device.
*/
export let scheduleVerifyMessages = function scheduleMakeMessage() {
 
    scheduler.scheduleJob('* * * * *', function () {
        console.log('Checking messages for registration...')
        Message.find({read: false}).lean().exec((err, messages) => {
            if (err) {
                console.log('Não foi possivel obter os resultados');
            }
    
            if(messages.length == 0){

                let newMsgHeart = new Message();
                newMsgHeart.read = false;
                
                newMsgHeart.desc = '<p>Now you can customize your avatar uploding your selfie.</p><p>Just click on the avatar, take of select a picture and save</p>';
                newMsgHeart.title = 'New Feature (Avatar Icon)';
                newMsgHeart.animation = true;
                newMsgHeart.typeOfAnimation = "heartBeat";
            
                newMsgHeart.save(err => {
                    if (err) {
                        console.log('Error saving heartBeat message');
                    }
                    console.log('heartBeat message save =] ');
                });

                let newMsgSlideToLeft = new Message();
                newMsgSlideToLeft.read = false;
                newMsgSlideToLeft.desc = '<p>Did you know that there is now a page where you can change your avatar?.</p><p>To do this simply drag to the left and click on Profile.</p>';
                newMsgSlideToLeft.title = 'New Feature (Profile Page)';
                newMsgSlideToLeft.animation = true;
                newMsgSlideToLeft.typeOfAnimation = "slideLeft";
            
                newMsgSlideToLeft.save(err => {
                    if (err) {
                        console.log('Error saving slideLeft message');
                    }
                    console.log('slideLeft message save =]');
                });
            }
        })
    });

}