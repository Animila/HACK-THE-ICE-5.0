import * as repl from "repl";

const apiError = require('../utils/api-error')
const categoryService = require('../services/categories-service')
class CategoriesController {
    async getAll(req: any, reply: any) {
        try {
            const data = await categoryService.getAll()
            console.log(data)
            reply.send(data)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }

    }
    async getId(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await categoryService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {title, path_logo} = req.body
        try {
            if(!title) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }
            if(!path_logo) {
                return apiError.BadRequest('Отсутствуют данные', 'path_logo');
            }
            const result = await categoryService.create(title, path_logo)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const {title, path_logo} = req.body
            const { id } = req.params
            const result = await categoryService.update(id, {title, path_logo})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await categoryService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new CategoriesController();