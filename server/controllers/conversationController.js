const User = require('../models/userModel')
const Conversation = require('../models/conversationModel')
const { socket, io } = require('../socket')

exports.getUserConversations = async (req, res, next) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
            .select('_id name conversations')
            .populate({
                path: "conversations",
                populate: {
                    path: 'users.user2',
                    select: 'name'
                }
            }).populate({
                path: "conversations",
                populate: {
                    path: 'users.user1',
                    select: 'name'
                }
            })
        if (!user) return res.status(403).json({
            msg: "there is unknown errir, Sorry :)"
        })
        return res.json({
            conversation: user.conversations,
        })
    } catch (error) {
        return res.status(403).json({
            msg: "there is unknown errir, Sorry :)"
        })
    }
}
exports.getConversationById = async (req, res, next) => {
    const userId = req.userId
    const { conversationId } = req.params;

    if (!conversationId) return res.status(401).json({
        msg: 'invalid conversation id !'
    })
    try {
        const conversation = await Conversation.findById(conversationId)
            .populate('users.user1', 'name email id')
            .populate('users.user2', 'name email id')
            .populate({
                path: 'messages',
                populate: {
                    path: 'sent_by',
                    select: 'name _id'
                }
            })
        if (!conversation) return res.status(401).json({
            msg: 'there is no conversation with this id :)'
        })
        socket().join(conversationId)
        return res.json({
            msg: 'successfull get the conversation',
            conversation
        })
    } catch (error) {
        return res.status(401).json({
            msg: 'there is no conversation with this id :)'
        })
    }
}
exports.createNewConversation = async (req, res, next) => {
    const userId = req.userId
    const { targetUserId } = req.body;

    const newConversation = {
        users: {
            user1: userId,
            user2: targetUserId
        },
        lastMessage: '',
        messages: []
    }

    if (targetUserId == userId) return res.status(403).json({
        msg: "you can't chat with yourself :)",
    })

    if (targetUserId.length !== userId.length) return res.status(403).json({
        msg: "invalid user id",
    })
    const user = await User.findById(targetUserId)
    if (!user) {
        return res.status(403).json({
            msg: "invalid user id",
        })
    }
    const checkOne = await Conversation.findOne({
        "users.user1": userId,
        "users.user2": targetUserId,
    })
    if (!checkOne) {
        const checkTwo = await Conversation.findOne({
            "users.user1": targetUserId,
            "users.user2": userId,
        })
        if (!checkTwo) {
            const conversation = await Conversation.create(newConversation)
            await User.findByIdAndUpdate(userId, { $push: { conversations: [conversation._id] } })
            await User.findByIdAndUpdate(targetUserId, { $push: { conversations: [conversation._id] } })
            console.log('---------------------------------')
            socket().emit('new-conversation', conversation)
            return res.json({
                msg: 'conversation created successfully !',
                conversation
            })
        } else {
            return res.json({
                msg: "you already have conversation with him !",
                conversation: checkTwo
            })
        }
    } else {
        return res.json({
            msg: "you already have conversation with him !",
            conversation: checkOne
        })
    }

}
exports.addNewMessageToConversation = async (req, res, next) => {
    const userId = req.userId;
    const { conversationId } = req.params;
    const { text, media } = req.body;

    if (!conversationId || !text) return res.status(401).json({
        msg: 'Please check the conversation Id/message is empty :)'
    })

    const newMessage = { text, media, sent_by: userId, createdAt: Date.now() }
    try {
        const conversation = await Conversation.findById(conversationId)
            .populate('messages.sent_by', 'name id')
        if (conversation.users.user1 != userId && conversation.users.user2 != userId) {
            return res.status(402).json({
                msg: 'you don\'t have the permission to access this conversation :)'
            })
        }
        if (!conversation) return res.status(400).json({
            msg: 'Please check the conversation Id/message is empty :)'
        })
        conversation.messages.push(newMessage)
        conversation.lastMessage = newMessage.text
        conversation.save()
        conversation.populate({
            path: 'messages',
            populate: {
                path: 'sent_by',
                select: "name id"
            },
        }).execPopulate(() => {
            const newMsg = conversation.messages[conversation.messages.length - 1]
            io().to(conversationId).emit('new-msg', newMsg)
            return res.json({
                msg: 'message add successfully',
                message: newMsg
            })
        })
    } catch (error) {
        return res.status(401).json({
            msg: 'Please check the conversation Id/message is empty :)'
        })
    }
}