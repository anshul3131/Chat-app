const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const axios = require("axios")
module.exports.register = async (req,res,next) => {
    try{
        const {username,email,password} = req.body;
        console.log(req.body)
        const usernameCheck = await User.findOne({username});
        if(usernameCheck)
            return res.json({msg : "username already exits",status : false});
        const emailCheck = await User.findOne({email});
        if(emailCheck)
            return res.json({msg : "email already exits",status : false});
        const hashedPassword = await bcrypt.hash(password,10);
        const user  =  await User.create({
            username,
            email,
            password : hashedPassword
        })
        
        delete user.password;
        return res.json({msg : "User Successfully Registered",status : true,user})

    }
    catch(err){
        next(err)
    }
}


module.exports.login = async (req,res,next) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(!user)
            return res.json({msg : "Username not found",status : false});
        const passwordCheck = await bcrypt.compare(password,user.password)
        if(!passwordCheck)
            return res.json({msg : "Incorrect Password",status : false});
        delete user.password;
        return res.json({msg : "User Successfully Login",status : true,user})

    }
    catch(err){
        next(err)
    }
}

module.exports.getavatar = async (req,res,next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const apiUrl = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${id}`;
        const response = await axios.get(apiUrl, { responseType: "text" }); // SVG is text-based

        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Access-Control-Allow-Origin", "*"); // Enable CORS
        res.send(response.data);
      } catch (error) {
        res.status(500).json({ error: `Failed to fetch avatar : ${error}` });
      }
}

module.exports.setavatar = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        user.isAvatarImageSet = true;
        user.avatarImage = req.body.image;
        const updatedUser = await User.findByIdAndUpdate(id,user,{new:true});
        return res.json({
            isSet : updatedUser.isAvatarImageSet,
            image : updatedUser.avatarImage
        })

    }
    catch(err){
        next(err)
    }
}


module.exports.getallusers = async (req,res,next)=>{
    try{
        const users = await User.find({_id : { $ne: req.params.id}}).select([
            "username",
            "email",
            "avatarImage",
            "_id"]
        )
        return res.json(users);
    }
    catch(err){
        next(err)
    }
}

module.exports.logout = async (req,res,next) => {
    try{
        if(!req.params.id)
            return res.json({msg : "user id is required"});
        return res.status(200).send();
    }
    catch(err){
        next(err);
    }
}