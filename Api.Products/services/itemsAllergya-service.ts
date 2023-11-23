
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class ItemsAllergyaService {
    async getAll() {
        const data = await prisma.list.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.list.findUnique({
            where: { id },
        });
    }

    async create(allergyId: number, itemId: number) {

        //
        return prisma.itemAllergy.create({
            data: {
                allergyId,
                itemId,
            },
        });
    }

    async update(id: number, newData: {allergyId: number, itemId: number}) {
        const old = await prisma.itemAllergy.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.itemAllergy.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.itemAllergy.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.itemAllergy.delete({
            where: { id },
        });
    }
}

module.exports = new ItemsAllergyaService()