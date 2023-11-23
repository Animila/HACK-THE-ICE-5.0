import * as repl from "repl";

const apiError = require('../utils/api-error')
const listService = require('../services/lists-service')
class ListsController {
    async getAll(req: any, reply: any) {
        try {
            const data = await listService.getAll()
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
            const result = await listService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {title, userId} = req.body

        try {
            if(!title) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }
            if(!userId) {
                return apiError.BadRequest('Отсутствуют данные', 'userId');
            }

            if(!parseInt(userId)) {
                return apiError.BadRequest('Несоответствующий тип данных (float)', 'userId');
            }
            const result = await listService.create(title, userId)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const {title, userId} = req.body
            const { id } = req.params
            const result = await listService.update(id, {title, userId})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await listService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new ListsController();