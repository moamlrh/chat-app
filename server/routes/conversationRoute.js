const conversationRouter = require('express').Router()
const conversationController = require('../controllers//conversationController')


conversationRouter.get('/get-user-conversations', conversationController.getUserConversations)
conversationRouter.get('/get-conversation-by-id/:conversationId', conversationController.getConversationById)
conversationRouter.post('/create-new-conversation', conversationController.createNewConversation)
conversationRouter.post('/add-new-message-to-conversation/:conversationId', conversationController.addNewMessageToConversation)


module.exports = conversationRouter