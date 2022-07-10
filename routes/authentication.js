const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        number: CryptoJS.AES.encrypt(req.body.number, process.env.NUM_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch{
    }
   
});

//Login
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("wrong credentials");
        const hashedNumber = CryptoJS.AES.decrypt(user.number, process.env.NUM_SEC);
        const OriginalNumber = hashedNumber.toString(CryptoJS.enc.Utf8);
        OriginalNumber !== req.body.number &&
            res.status(401).json("wrong credentials");

            const accessToken = jwt.sign({
                id:user._id, 
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const {number, ...others} = user._doc;

        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;


