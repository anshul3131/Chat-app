const {register,login,getavatar,setavatar,getallusers,logout} = require("../controllers/userController");

const router = require("express").Router()

router.post('/register',register)
router.post('/login',login)
router.get('/getavatar/:id',getavatar)
router.post('/setavatar/:id',setavatar)
router.get('/get-all-users/:id',getallusers)
router.get('/logout/:id',logout);
module.exports = router;