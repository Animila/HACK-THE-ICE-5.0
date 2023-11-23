import * as repl from "repl";

const apiError = require('../utils/api-error')
const itemsService = require('../services/items-service')
class ItemsController {
    async getAll(req: any, reply: any) {
        try {
            const data = await itemsService.getAll()
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
            const result = await itemsService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {typeItemId, unitId, count, start_date, end_date, listId, title} = req.body
        try {
            if(!typeItemId) {
                return apiError.BadRequest('Отсутствуют данные', 'typeItemId');
            }
            if(!parseInt(typeItemId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'typeItemId');
            }
            if(!unitId) {
                return apiError.BadRequest('Отсутствуют данные', 'unitId');
            }
            if(!parseInt(unitId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'unitId');
            }
            if(!start_date) {
                return apiError.BadRequest('Отсутствуют данные', 'start_date');
            }
            if(!((new Date(start_date)).getTime() > 0)) {
                return apiError.BadRequest('Несоответствующий тип данных (DateTime)', 'start_date');
            }
            if(!end_date) {
                return apiError.BadRequest('Отсутствуют данные', 'end_date');
            }
            if(!((new Date(end_date)).getTime() > 0)) {
                return apiError.BadRequest('Несоответствующий тип данных (DateTime)', 'end_date');
            }
            if(!listId) {
                return apiError.BadRequest('Отсутствуют данные', 'listId');
            }
            if(!parseInt(unitId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'unitId');
            }
            if(!count) {
                return apiError.BadRequest('Отсутствуют данные', 'count');
            }
            if(!parseInt(count)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'count');
            }
            if(!title) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }

            const result = await itemsService.create(typeItemId, unitId, count, start_date, end_date, listId, title)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const {typeItemId, unitId, count, start_date, end_date, listId, title} = req.body
            const { id } = req.params
            const result = await itemsService.update(id, {typeItemId, unitId, count, start_date, end_date, listId, title})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await itemsService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new ItemsController();