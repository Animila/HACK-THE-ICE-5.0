import { PrismaClient, Prisma } from '@prisma/client'
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

const prisma = new PrismaClient()
class UserService {
    async registration(email: string, password: string) {
        const searchUser = await prisma.User.findUnique({
            where: {
                email: email
            }
        })
        if(searchUser) {
            throw new Error(`Пользователь с почтой ${email} уже существует `)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const newUser = await prisma.User.create({
            data: {
                email: email,
                password: hashPassword
            }
        })
        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, userDto.email)

        return {...tokens,user: userDto}
    }
    async login(email: string, password: string) {
        const user = await prisma.User.findUnique({where: {
            email: email
            }})
        if(!user) {
            throw new Error(`Пользователь с почтой ${email} не существует`)
        }
        const isPassEquals = await bcrypt.compact(password, user.password)
        if(!isPassEquals) {
            throw new Error(`Неверный пароль`)
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, userDto.email)

        return {...tokens,user: userDto}
    }
}

module.exports = new UserService();