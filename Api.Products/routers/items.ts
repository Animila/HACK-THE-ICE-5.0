import { FastifyInstance } from 'fastify';
const { ItemResponse, ErrorResponse } = require('../config/models')
const itemController = require('../controllers/items-controller')

const getAll = {
    schema: {
        tags: ['item'],
        response: {
            200: {
                type: "array",
                items: ItemResponse
            },
            400: ErrorResponse,
        },
    },
    handler: itemController.getAll,
}

const create = {
    schema: {
        tags: ['item'],
        response: {
            200: ItemResponse,
            400: ErrorResponse,
        },
        body: {
            title: {type: 'string'},
            typeItemId: { type: 'number' },
            unitId: { type: 'number' },
            count: { type: 'number' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            listId: { type: 'number' },
        }
    },
    handler: itemController.create,
}

const getId = {
    schema: {
        tags: ['item'],
        response: {
            200: ItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: itemController.getId,
}

const update = {
    schema: {
        tags: ['item'],
        response: {
            200: ItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            title: {type: 'string'},
            typeItemId: { type: 'number' },
            unitId: { type: 'number' },
            count: { type: 'number' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            listId: { type: 'number' },
        }

    },
    handler: itemController.update,
}

const deleteId = {
    schema: {
        tags: ['item'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: itemController.delete,
}


function itemRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
    fastify.get('/', getAll)
    fastify.post('/' , create)
    fastify.get('/:id', getId)
    fastify.put('/:id', update)
    fastify.delete('/:id', deleteId)

    done();
}

module.exports = itemRouter;