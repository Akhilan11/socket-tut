const Message = require('../model/message')

const newMessage = async(req,res) => {
    const { username, content } = req.body
    if (!username || !content) {
        return res.status(400).json({ message: 'Username and content are required.' });
    }
    try {
        const msg = await Message.create({ username, content})
        res.status(201).json(msg)
    } catch(err) {
        console.log("Failed to create msg : ",err)
        res.status(500).json(err)
    }
}

const getAllMessages = async(req,res) => {
    try {
        const messages = await Message.find({}).sort({createdAt : -1})
        res.status(200).json(messages)
    } catch (err) {
        console.log("Failed to fetch messages :",err)
        res.status(500).json(err)
    }
}

module.exports = { newMessage, getAllMessages }