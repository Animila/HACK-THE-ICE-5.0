import { Request, Response, NextFunction } from "express";
const userService = require('../service/user-service')

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body()
            const userData = await userService.login(email, password)

        } catch (e) {

        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(["123", "3456"]);
        } catch (e) {

        }
    }
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new UserController();