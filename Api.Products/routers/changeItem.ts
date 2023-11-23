import { FastifyInstance } from 'fastify';
const { ChangeItemResponse, ErrorResponse } = require('../config/models')
const changeItemController = require('../controllers/changeItem-controller')

const getAll = {
    schema: {
        tags: ['addRecords'],
        response: {
            200: {
                type: "array",
                items: ChangeItemResponse
            },
            400: ErrorResponse,
        },
    },
    handler: changeItemController.getAll,
}

const create = {
    schema: {
        tags: ['addRecords'],
        response: {
            200: ChangeItemResponse,
            400: ErrorResponse,
        },
        body: {
            itemId: {type: 'number'},
            count: {type: 'number'},
            date: { type: 'string' },
            type: {type: 'string'}
        }
    },
    handler: changeItemController.create,
}

const getId = {
    schema: {
        tags: ['addRecords'],
        response: {
            200: ChangeItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: changeItemController.getId,
}

const update = {
    schema: {
        tags: ['addRecords'],
        response: {
            200: ChangeItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            itemId: {type: 'number'},
            count: {type: 'number'},
            date: { type: 'string' },
            type: {type: 'string'}

        }

    },
    handler: changeItemController.update,
}

const deleteId = {
    schema: {
        tags: ['addRecords'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: changeItemController.delete,
}


function addRecordsRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
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

module.exports = addRecordsRouter;