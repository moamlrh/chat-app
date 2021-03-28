
const User = require('../models/userModel')


exports.getAllUsers = async (req, res, next) => {
    const userId = req.userId
    const users = await User.find()
        .where('_id').ne(userId)
        .where('offline').equals(true)
        .where('blockList').nin([{ _id: userId }])
        .select('-password -conversations -blockList')
    if (users) {
        return res.json({
            msg: 'successfully get all users ',
            users
        })
    } else {
        return res.json({
            msg: 'there is no user :)',
            users
        })
    }
}

exports.getUserById = async (req, res, next) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId)
            .select('-password -conversations -blockList')
        if (!user) return res.status(404).json({ msg: 'there is no user with this id !' })
        return res.json({
            msg: 'get user by id successfully !',
            user
        })
    } catch (error) {
        return res.status(404).json({ msg: 'there is no user with this id !' })
    }
}

exports.blockUser = async (req, res, next) => {
    const userId = req.userId;
    const { targetUserId } = req.body

    if (!targetUserId) return res.stats(401).json({ msg: 'invailed user id :)' })
    try {
        const user = await User.findById(userId)
            .where('blockList').nin([{ _id: targetUserId }])
        if (!user) return res.status(401).json({ msg: 'user already blocked !' })

        const targetUser = await User.findById(targetUserId)
        user.blockList.push(targetUserId)
        targetUser.blockList.push(userId)
        user.save()
        targetUser.save()
        return res.json({ msg: 'user successgully blocked :)' })

    } catch (error) {
        return res.status(401).json({ msg: 'invailed user id :)' })
    }
}

exports.getUserInfo = async (req, res, next) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId).select('name email _id')
        if (!user) return res.json({
            msg: 'there is an error '
        })
        return res.json({
            msg: 'this is your information',
            user
        })
    } catch (error) {
        return res.status(404).json({
            error,
            msg: 'there is an error !'
        })
    }
}