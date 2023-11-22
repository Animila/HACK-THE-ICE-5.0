import {Router} from "express";
const userController  = require("../controller/user-controller");
const router: Router = Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout' , userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refreshToken', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/user:id', userController.getUser)

module.exports = router;