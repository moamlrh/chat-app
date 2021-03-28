const { model, Schema } = require('mongoose')



const messagesSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    },
    sent_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

const conversationSchema = new Schema({
    users: {
        user1: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        user2: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    lastMessage: String,
    messages: [messagesSchema]
}, { timestamps: true })


module.exports = model('Conversation', conversationSchema)