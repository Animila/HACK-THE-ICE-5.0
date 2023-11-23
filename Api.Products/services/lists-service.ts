
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class ListsService {
    async getAll() {
        const data = await prisma.list.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.list.findUnique({
            where: { id },
        });
    }

    async create(title: string, userId: number) {

        const old = await prisma.list.findFirst({where: {title: title}})
        if(old) {
            throw ApiError.IsNotEmpty()
        }
        //
        return prisma.list.create({
            data: {
                title,
                userId,
            },
        });
    }

    async update(id: number, newData: {title: string, userId: number}) {
        const old = await prisma.list.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.list.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.list.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.list.delete({
            where: { id },
        });
    }
}

module.exports = new ListsService()