
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class ItemsService {
    async getAll() {
        const data = await prisma.item.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.item.findUnique({
            where: { id },
        });
    }

    async create(typeItemId: number, unitId: number, count: number, start_date: Date, end_date: Date, listId: number, title: string) {
        const old = await prisma.item.findFirst({where: {title: title}})
        if(old) {
            throw ApiError.IsNotEmpty()
        }

        return prisma.item.create({
            data: {
                title,
                subcategoryId: typeItemId,
                unitId,
                count,
                start_date,
                end_date,
                listId,

            },
        });
    }

    async update(id: number, newData: {typeItemId: number, unitId: number, count: number, start_date: Date, end_date: Date, listId: number, title: string}) {
        const old = await prisma.item.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.item.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.item.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.item.delete({
            where: { id },
        });
    }
}

module.exports = new ItemsService()