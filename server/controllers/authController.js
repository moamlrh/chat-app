const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_JWT_KEY || 'd77590bf111825243804257ee4538961c9b58d'

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!password || !email) return res.status(402).json({ msg: 'please check the fields ?' })

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: 'Please check your email/password' })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return res.status(400).json({ msg: 'Wrong Password try again !' })

        const token = jwt.sign({ email, id: user._id }, secretKey, { expiresIn: '1y' })
        return res.status(200).json({
            msg: 'login successful !',
            userId: user._id,
            token,
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'there is unknown error !'
        })
    }
}

exports.signup = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!name || !password || !name) return res.status(402).json({ msg: 'please check the fields ?' })
    User.findOne({ email: email }).then((user) => {
        if (user) return res.status(404).json({ msg: 'There is another user with this email !' })
        bcrypt.hash(password, 12).then(hashedPassword => {
            const newUser = {
                name,
                email,
                password: hashedPassword,
            }
            User.create(newUser).then(user => {
                return res.status(200).json({
                    msg: 'created userd successfully !',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        createdAt: user.createdAt
                    },
                })
            })
        })
    }).catch(() => {
        res.status(500).json({
            msg: 'there is an unknown error sorry !'
        })
    })
}

