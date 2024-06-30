const express = require ('express')
// controller functions
const {signupUser, loginUser, getUser,getUsers } = require ('../controllers/UserController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get("/:id", getUser)

router.get("/", getUsers)



module.exports = router