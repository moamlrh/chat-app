const { model, Schema } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    blockList: [
        { user: Schema.Types.ObjectId }
    ],
    offline: Boolean
}, { timestamps: true })

userSchema.index({ name: 'text', email: 'text' })

module.exports = model('User', userSchema)