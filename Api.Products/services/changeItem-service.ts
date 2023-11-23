
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class ChangeItemService {
    async getAll() {
        const data = await prisma.changeItem.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.changeItem.findUnique({
            where: { id },
        });
    }

    async create(itemId: number, count: number, date: Date, type: ["ADD", "MODIFY", "REMOVE"]) {
        return prisma.changeItem.create({
            data: {
                itemId,
                count,
                date,
                type
            },
        });
    }

    async update(id: number, newData: {itemId: number, count: number, date: Date}) {
        const old = await prisma.changeItem.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.changeItem.update({
            where: { id },
            data: {...newData, type: "MODIFY"},
        });
    }

    async delete(id: number) {
        const old = await prisma.changeItem.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.changeItem.delete({
            where: { id },
        });
    }
}

module.exports = new ChangeItemService()