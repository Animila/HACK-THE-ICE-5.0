import * as repl from "repl";

const apiError = require('../utils/api-error')
const itemsAllergyaService = require('../services/itemsAllergya-service')
class ItemsAllergyaController {
    async getAll(req: any, reply: any) {
        try {
            const data = await itemsAllergyaService.getAll()
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
            const result = await itemsAllergyaService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {allergyId,itemId} = req.body

        try {
            if(!allergyId) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }
            if(!parseInt(allergyId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'allergyId');
            }
            if(!itemId) {
                return apiError.BadRequest('Отсутствуют данные', 'userId');
            }

            if(!parseInt(itemId)) {
                return apiError.BadRequest('Несоответствующий тип данных (int)', 'itemId');
            }
            const result = await itemsAllergyaService.create(allergyId,itemId)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const { allergyId,itemId} = req.body
            const { id } = req.params
            const result = await itemsAllergyaService.update(id, {allergyId,itemId})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await itemsAllergyaService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new ItemsAllergyaController();