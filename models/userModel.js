const mongoose = require('mongoose')
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim:true
    }, 
    email: {
        type:String,
        required: true,
        trim:true
    },
    password: {
        type:String,
        required: true,
        trim:true
    },
    token: {
        type:String
    }
},{
    timestamps:true
})
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        return ({ msg :'Unable to login'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return ({ msg: 'Unable to login enter valid password' })
    }
    return user
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user.email},process.env.JWT_SECRET)
    user.token = token
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)


module.exports = User