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
    async saveToken(userId: number, refreshToken: string) {
        const searchToken = await prisma.Token.findUnique
        if(searchToken) {
            const result = await prisma.Token.update({
                where: {
                    userId: userId
                },
                data: {
                    refreshToken: refreshToken
                }
            });
            return searchToken
        }
        const createdToken = await prisma.Token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        });

        return createdToken;
    }
}

module.exports = new TokenService();