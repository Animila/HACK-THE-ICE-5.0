
// @ts-ignore
const { PrismaClient } = require('@prisma/client');
// @ts-ignore
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class TypeItemService {
    async getAll() {
        const data = await prisma.subCategory.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.subCategory.findUnique({
            where: { id },
        });
    }

    async create(title: string, path_logo: string, default_day: string) {

        const old = await prisma.subCategory.findFirst({where: {title: title}})
        if(old) {
            throw ApiError.IsNotEmpty()
        }

        return prisma.subCategory.create({
            data: {
                title,
                default_day,
                path_logo,
            },
        });
    }

    async update(id: number, newData: {title: string, path_logo: string, default_day: string}) {
        const old = await prisma.subCategory.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.subCategory.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.subCategory.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.subCategory.delete({
            where: { id },
        });
    }
}

module.exports = new TypeItemService()