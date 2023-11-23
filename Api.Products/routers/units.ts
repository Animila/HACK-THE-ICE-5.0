import { FastifyInstance } from 'fastify';
const { UnitResponse, ErrorResponse } = require('../config/models')
const unitsController = require('../controllers/units-controller')

const getAll = {
    schema: {
        tags: ['units'],
        response: {
            200: {
                type: "array",
                items: UnitResponse
            },
            400: ErrorResponse,
        },
    },
    handler: unitsController.getAll,
}

const create = {
    schema: {
        tags: ['units'],
        response: {
            200: UnitResponse,
            400: ErrorResponse,
        },
        body: {
            title: {type: "string"},
        }
    },
    handler: unitsController.create,
}

const getId = {
    schema: {
        tags: ['units'],
        response: {
            200: UnitResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: unitsController.getId,
}

const update = {
    schema: {
        tags: ['units'],
        response: {
            200: UnitResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            title: {type: "string"},
        }

    },
    handler: unitsController.update,
}

const deleteId = {
    schema: {
        tags: ['units'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: unitsController.delete,
}


function unitsRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
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

module.exports = unitsRouter;