
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class UnitsService {
    async getAll() {
        const data = await prisma.unit.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.unit.findUnique({
            where: { id },
        });
    }

    async create(title: string) {

        const old = await prisma.unit.findFirst({where: {title: title}})
        if(old) {
            throw ApiError.IsNotEmpty()
        }
        //
        return prisma.unit.create({
            data: {
                title,
            },
        });
    }

    async update(id: number, newData: {title: string}) {
        const old = await prisma.unit.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.unit.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.unit.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.unit.delete({
            where: { id },
        });
    }
}

module.exports = new UnitsService()