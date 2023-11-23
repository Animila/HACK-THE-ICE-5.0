
const apiError = require('../utils/api-error')
const unitService = require('../services/units-service')
class UnitsController {
    async getAll(req: any, reply: any) {
        try {
            const data = await unitService.getAll()
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
            const result = await unitService.getById(id)
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async create(req: any, reply: any) {
        const {title} = req.body

        try {
            if(!title) {
                return apiError.BadRequest('Отсутствуют данные', 'title');
            }
            const result = await unitService.create(title)
            return result
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async update(req: any, reply: any) {
        try {
            const {title} = req.body
            const { id } = req.params
            const result = await unitService.update(id, {title})
            reply.send(result)
        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }
    async delete(req: any, reply: any) {
        try {
            const {id} = req.params
            const result = await unitService.delete(id)
            return result;

        } catch (e) {
            console.error(e);
            reply.send(e);
        }
    }

}

module.exports = new UnitsController();