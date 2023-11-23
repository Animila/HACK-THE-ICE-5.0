import * as repl from "repl";

const apiError = require('../utils/api-error')
const typeitemService = require('../services/typeItem-service')
class TypeItemController {
    async getAll(req: any, reply: any) {
        try {
            const data = await typeitemService.getAll()
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
            const result = await typeitemService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {title, path_logo, default_day, categoryId} = req.body

        try {
            if(!title) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }
            if(!path_logo) {
                return apiError.BadRequest('Отсутствуют данные', 'path_logo');
            }
            if(!default_day) {
                return apiError.BadRequest('Отсутствуют данные', 'default_day');
            }
            if(!categoryId) {
                return apiError.BadRequest('Отсутствуют данные', 'categoryId');
            }
            if(!parseInt(categoryId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'categoryId');
            }
            if(!parseFloat(default_day)) {
                return apiError.BadRequest('Несоответствующий тип данных (float)', 'default_day');
            }
            const result = await typeitemService.create(title, path_logo, default_day, categoryId)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const {title, path_logo, default_day} = req.body
            const { id } = req.params
            const result = await typeitemService.update(id, {title, path_logo, default_day})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await typeitemService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new TypeItemController();