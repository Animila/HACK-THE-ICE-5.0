import { FastifyInstance } from 'fastify';
const { TypeItemResponse, ErrorResponse } = require('../config/models')
const categoriesController = require('../controllers/categories-controller')

const getAll = {
    schema: {
        tags: ['typeItem'],
        response: {
            200: {
                type: "array",
                items: TypeItemResponse
            },
            400: ErrorResponse,
        },
    },
    handler: categoriesController.getAll,
}

const create = {
    schema: {
        tags: ['typeItem'],
        response: {
            200: TypeItemResponse,
            400: ErrorResponse,
        },
        body: {
            title: { type: 'string' },
            default_day: {type: 'string'},
            path_logo: { type: 'string' },
        }
    },
    handler: categoriesController.create,
}

const getId = {
    schema: {
        tags: ['typeItem'],
        response: {
            200: TypeItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: categoriesController.getId,
}

const update = {
    schema: {
        tags: ['typeItem'],
        response: {
            200: TypeItemResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            title: { type: 'string' },
            default_day: {type: 'string'},
            path_logo: { type: 'string' },
        }

    },
    handler: categoriesController.update,
}

const deleteId = {
    schema: {
        tags: ['typeItem'],
        response: {
            200: {id: {type: "number"}},
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },

    },
    handler: categoriesController.delete,
}


function typeItemRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
    fastify.get('/', getAll)
    fastify.post('/' , create)
    fastify.get('/:id', getId)
    fastify.put('/:id', update)
    fastify.delete('/:id', deleteId)

    done();
}

module.exports = typeItemRouter;