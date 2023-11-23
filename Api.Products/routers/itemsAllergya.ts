import { FastifyInstance } from 'fastify';
const { ItemsAllergyResponse, ErrorResponse } = require('../config/models')
const itemsAllergyaController = require('../controllers/itemsAllergya-controller')

const getAll = {
    schema: {
        tags: ['itemAllergy'],
        response: {
            200: {
                type: "array",
                items: ItemsAllergyResponse
            },
            400: ErrorResponse,
        },
    },
    handler: itemsAllergyaController.getAll,
}

const create = {
    schema: {
        tags: ['itemAllergy'],
        response: {
            200: ItemsAllergyResponse,
            400: ErrorResponse,
        },
        body: {
            allergyId: { type: 'number' },
            itemId: { type: 'number' },
        }
    },
    handler: itemsAllergyaController.create,
}

const getId = {
    schema: {
        tags: ['itemAllergy'],
        response: {
            200: ItemsAllergyResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: itemsAllergyaController.getId,
}

const update = {
    schema: {
        tags: ['itemAllergy'],
        response: {
            200: ItemsAllergyResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            allergyId: { type: 'number' },
            itemId: { type: 'number' },
        }

    },
    handler: itemsAllergyaController.update,
}

const deleteId = {
    schema: {
        tags: ['itemAllergy'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: itemsAllergyaController.delete,
}


function itemsAllergyaRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
    // получение всех ресурсов
    fastify.get('/', getAll)
    // создать новый ресурс
    fastify.post('/' , create)
    // получить данные о ресурсе
    fastify.get('/:id', getId)
    // отредактировать данные о ресурсе
    fastify.put('/:id', update)
    // изменить данные о ресурсе
    fastify.delete('/:id', deleteId)

    done();
}

module.exports = itemsAllergyaRouter;