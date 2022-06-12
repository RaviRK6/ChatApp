const {Router} = require("express")
const auth = require("../middleware/auth")
const User = require("../models/userModel")

const router = new Router()

router.get('/hi', (req,res)=>{
    res.json({"cont":"hi from router"})
})

router.post('/create', async (req,res)=>{
    const user = new User(req.body)
    try{
        if(req.body.userid != "" && req.body.email != "" && req.body.password != ""){
            await user.save()
            res.status(201).send(user)
        }else{
            res.send({"msg": "enter a valid userid and email and password" })
        }
    } catch(e){
        res.status(400).send(e)
    }
})

router.post("/login",async (req,res)=>{
    try{
        if(req.body.email != "" && req.body.password != ""){
            const user = await User.findByCredentials(req.body.email,req.body.password)
            if(user.msg){
                res.send(user)
            }else{
                const token = await user.generateAuthToken()
                res.send(user)
            }
        }else{
            res.send({"msg": "enter a valid email and password" })
        }
       
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get("/logout", auth, async (req,res)=>{
    try{
        req.user.token = null
        await req.user.save()
        res.send("logout successfully")
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get("/me", auth, async (req,res)=>{
    try{
        const user = await User.find(req.user)
        res.send(user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get("/users", auth, async (req,res)=>{
    try{
        const email =req.user.email
        const user = await User.find({ 'email' : { $ne: email}})
        res.send(user)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router