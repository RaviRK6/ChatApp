const {Router} = require("express")
const auth = require("../middleware/auth")
const Message = require("../models/messageModel")

const router = new Router()

router.post('/addmsg',auth, async (req,res)=>{
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: req.user._id,
        });
        if (data) return res.send({ msg: "Message added successfully." });
        else return res.send({ msg: "Failed to add message to the database" });
    } catch (e) {
        res.send(e)
    }
})

router.post('/getmsg',auth, async (req,res)=>{
    try {
        const {from , to} = req.body
        const message = await Message.find({
            users:{
                $all: [from,to]
            }
        }).sort({updatedAT: 1})
        // const projectedMessages = message.map((msg) => {
        //     return {
        //       fromSelf: msg.sender.toString() === user.from,
        //       message: msg.message.text,
        //     };
        //   });
        res.send(message)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router