import {PrismaClient} from '@prisma/client'

const bcrypt = require('bcryptjs')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../utils/api-error')

const prisma = new PrismaClient()
class UserService {
    async registration(email: string, password: string) {
        const searchUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(searchUser) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует `)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })
        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({where: {
            email: email
            }})
        if(!user) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} не существует`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await prisma.user.findUnique({where: {id: userData.id}})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens,user: userDto}
    }

    async getUser(id: number) {
        const user = await prisma.user.findUnique({where: {id: id}})
        if(!user) {
            throw ApiError.BadRequest(`Пользователь c id = ${id} не существует`)
        }
        const userDto = new UserDto(user);
        return userDto

    }

    async getAll() {
        const users = await prisma.user.findMany({});
        const usersDto = users.map(user => (new UserDto(user)));
        console.log(usersDto);
        return usersDto;
    }
}

module.exports = new UserService();