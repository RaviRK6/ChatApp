const {Router} = require("express")
const auth = require("../middleware/auth")
const User = require("../models/userModel")

const router = new Router()

router.get('/hi',auth, (req,res)=>{
    res.send("hi from router")
})

router.post('/create', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.post("/login",async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send(user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post("/logout", auth, async (req,res)=>{
    try{
        req.user.token = null
        await req.user.save()
        res.send("logout successfully")
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router