const User = require("../models/User.model")
const Room = require("../models/Room.model")

module.exports = async (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    const roomId = req.params.id
    const room = await Room.findById(roomId)
    const roomOwerId = room.owner
    const currentUserId = req.user._id
    const isSameUser = JSON.stringify(currentUserId)===JSON.stringify(roomOwerId)
    console.log('isSameUser: ', isSameUser)
    
    if(isSameUser){
        next()
    }
    else{
        res.send('you dont own this room')
        }
  };
  