const User = require("../models/userModel")

module.exports.setUp = async (req,res,next) => {
    try{
        const users = await User.find();
        return res.json(users)
    } catch(ex){
        next(ex)
    }
};
module.exports.onChat = async (req,res,next) => {
    try{
        const {userSelect} = req.body;
        const user = await User.findOne({_id: userSelect});
        if(!user)
            return res.json({msg: "Please select agian", status : false});
        return res.json({status: true, user})
    } catch(ex){
        next(ex)
    }
};

module.exports.getAllContacts = async (req,res,next) => {
    try{
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "username",
            "avatarImage",
            "_id",
        ])
        return res.json(users)
    } catch(ex){
        next(ex)
    }
};

