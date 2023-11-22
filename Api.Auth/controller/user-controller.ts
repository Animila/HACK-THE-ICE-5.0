const userService = require('../service/user-service')
const ApiError = require('../utils/api-error');
class UserController {
    async registration(req: any, reply: any) {
        try {
            const {email, password} = req.body
            if(!email) {
                return ApiError.BadRequest("email отсутствует")
            }
            if(!password) {
                return ApiError.BadRequest("password отсутствует")
            }
            const userData = await userService.registration(email, password)
            return reply.send(userData)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async login(req: any, reply: any) {
        try {
            const {email, password} = req.body
            if(!email) {
                return ApiError.BadRequest("email отсутствует")
            }
            if(!password) {
                return ApiError.BadRequest("password отсутствует")
            }
            const userData = await userService.login(email, password)
            return reply.send(userData)
        } catch (e) {
            console.log(e)
            reply.send(e);
        }
    }
    async logout(req: any, reply: any) {
        try {
            const refreshToken = req.headers.authorization.replace('Bearer ', '');
            const token = await userService.logout(refreshToken)
            return reply.send(token)
        } catch (e) {
            console.log(e)
            reply.send(e);
        }
    }

    async refresh(req: any, reply: any) {
        try {
            const refreshToken = req.headers.authorization.replace('Bearer ', '');
            const userData = await userService.refresh(refreshToken)
            return reply.send(userData)

        } catch (e) {
            console.log(e)
            reply.send(e);
        }
    }
    async getUsers(req: any, reply: any) {
        try {
           const users = await userService.getAll()
            return reply.send(users)
        } catch (e) {
            console.log(e)
            reply.send(e);
        }
    }
    async getUser(req: any, reply: any) {
        try {
            const {id} = req.params
            const user = await userService.getUser(id)
            return reply.send(user)
        } catch (e) {
            console.log(e)
            reply.send(e);
        }
    }
}

module.exports = new UserController();