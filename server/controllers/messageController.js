const { Messages } = require("../../public/src/context/context");
const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const msgInfo = req.body;
    console.log(msgInfo)
    const message = await Message.create({
      message: {text : msgInfo.message},
      users: [msgInfo.from,msgInfo.to],
      sender: msgInfo.from,
    });
    if(message)
        return res.json({msg : "Message Added Successfully" , status : 'ok'})
    return res.json({msg : "Message failed to add" , status : 'failed'})
  } catch (err) {
    console.log(err)
    next(err);
  }
};

module.exports.getMessages = async (req,res,next) => {
    try{
        const {from,to} = req.body;
        const messages = await Message.find({users : {$all : [from,to]}}).sort({updatedAt : 1});
        const formattedMessages = messages.map((msg)=>{
            return ({
                isSender : from.toString()===msg.sender.toString(),
                message : msg.message.text
            })
        })
        console.log(formattedMessages)
        if(messages)
            return res.json({msgs : formattedMessages,status : 'ok'});
        return res.json({status : 'failed'});
    }
    catch(err){
        next(err)
    }
}