const router = require("express").Router();
const User = require("../models/User");

// login
router.post('/login', async function(req, res){
    try {
        const result = await User.findOne({email:req.body.email, password:req.body.password});
        if(result){
           res.send(result); 
        }else{
            res.status(500).json("Error");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// register
router.post('/register', async function(req, res){
    try {
        const result = await User.find({email:req.body.email});
        if(result){
            res.status(500).json(error);
        }else{
            const newUser = new User(req.body);
            await newUser.save();
            res.send("User Registered Succesfully");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;