import {verify} from "crypto";

const jwt = require('jsonwebtoken')
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const searchToken = await prisma.token.findUnique({
            where: {
                userId: userId
            }
        });

        if(searchToken) {
            console.log(refreshToken)
            const result = await prisma.token.update({
                where: {
                    userId: userId
                },
                data: {
                    refreshToken: refreshToken
                }
            });
            return searchToken
        }
        const createdToken = await prisma.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        });

        return createdToken;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await prisma.token.delete({
        // @ts-ignore
            where: {
                refreshToken: refreshToken
            }
        });
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await prisma.token.findUnique({
            // @ts-ignore
            where: {
                refreshToken: refreshToken
            }
        });
        return tokenData
    }
}

module.exports = new TokenService();