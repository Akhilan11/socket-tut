const Message = require('../model/messageSchema')

const postMessage = async(req,res) => {
    const { username, content} = req.body
    if(!content || !username) {
        return res.status(400).json({ message: 'username and content are required' });
    }
    try {
        const newMessage = new Message({username , content})
        await newMessage.save()
        res.status(201).json(newMessage)
        console.log("Message saved")
    } catch(err) {
        console.log("Error saving message : " ,err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getMessage = async(req,res) => {
    try {
        const messages = await Message.find({})
        res.status(200).json(messages);
    } catch (err) {
        console.log("Error fetching message : " ,err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    postMessage, getMessage
}
