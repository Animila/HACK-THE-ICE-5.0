import { FastifyInstance } from 'fastify';
const { ListResponse, ErrorResponse } = require('../config/models')
const listsController = require('../controllers/lists-controller')

const getAll = {
    schema: {
        tags: ['lists'],
        response: {
            200: {
                type: "array",
                items: ListResponse
            },
            400: ErrorResponse,
        },
    },
    handler: listsController.getAll,
}

const create = {
    schema: {
        tags: ['lists'],
        response: {
            200: ListResponse,
            400: ErrorResponse,
        },
        body: {
            title: {type: "string"},
            userId: {type: "number"}
        }
    },
    handler: listsController.create,
}

const getId = {
    schema: {
        tags: ['lists'],
        response: {
            200: ListResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: listsController.getId,
}

const update = {
    schema: {
        tags: ['lists'],
        response: {
            200: ListResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            title: {type: "string"},
            userId: {type: "number"}
        }

    },
    handler: listsController.update,
}

const deleteId = {
    schema: {
        tags: ['lists'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: listsController.delete,
}


function itemsRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
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

module.exports = itemsRouter;