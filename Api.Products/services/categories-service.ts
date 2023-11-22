
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// @ts-ignore
const ApiError = require('../utils/api-error')

class CategoriesService {
    async getAll() {
        const data = await prisma.category.findMany({});
        return data || []
    }
    async getById(id: number) {
        return prisma.category.findUnique({
            where: { id },
        });
    }

    async create(title: string, path_logo: string) {

        const old = await prisma.category.findFirst({where: {title: title}})
        if(old) {
            throw ApiError.IsNotEmpty()
        }

        return prisma.category.create({
            data: {
                title,
                path_logo,
            },
        });
    }

    async update(id: number, newData: {title: string, path_logo: string}) {
        const old = await prisma.category.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.category.update({
            where: { id },
            data: newData,
        });
    }

    async delete(id: number) {
        const old = await prisma.category.findFirst({where: {id}})
        if(!old) {
            throw ApiError.NotFound()
        }
        return prisma.category.delete({
            where: { id },
        });
    }
}

module.exports = new CategoriesService()