import * as repl from "repl";

const apiError = require('../utils/api-error')
const changeItemService = require('../services/changeItem-service')
class ChangeItemController {
    async getAll(req: any, reply: any) {
        try {
            const data = await changeItemService.getAll()
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
            const result = await changeItemService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {itemId, count, date, type } = req.body
        const validTypes = ['ADD', 'MODIFY', 'REMOVE'];
        try {
            if(!type) {
                return apiError.BadRequest('Отсутствуют данные', 'type');
            }
            if(!validTypes.includes(type)) {
                return apiError.BadRequest("Несоответствующий тип данных ('ADD', 'MODIFY', 'REMOVE')", 'type');
            }
            if(!itemId) {
                return apiError.BadRequest('Отсутствуют данные', 'itemId');
            }
            if(!parseInt(itemId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'itemId');
            }
            if(!count) {
                return apiError.BadRequest('Отсутствуют данные', 'count');
            }
            if(!parseInt(count)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'count');
            }
            if(!((new Date(date)).getTime() > 0)) {
                return apiError.BadRequest('Несоответствующий тип данных (DateTime)', 'date');
            }
            if(!date) {
                return apiError.BadRequest('Отсутствуют данные', 'date');
            }


            const result = await changeItemService.create(itemId, count, date, type)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
        const validTypes = ['ADD', 'MODIFY', 'REMOVE'];
            const {itemId, count, date, type} = req.body
            const { id } = req.params

            if(!type) {
                return apiError.BadRequest('Отсутствуют данные', 'type');
            }
            if(!validTypes.includes(type)) {
                return apiError.BadRequest("Несоответствующий тип данных ('ADD', 'MODIFY', 'REMOVE')", 'type');
            }

            const result = await changeItemService.update(id, {itemId, count, date})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await changeItemService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new ChangeItemController();