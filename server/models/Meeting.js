const mongoose = require('mongoose');
const schema=mongoose.Schema({
    meetingId:{
        type:Number,
        required:true,
    }
})
const model=mongoose.model('meetingCodes',schema);
module.exports=model