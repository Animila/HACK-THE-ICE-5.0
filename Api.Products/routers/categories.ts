import { FastifyInstance } from 'fastify';
const { CategoryResponse, ErrorResponse } = require('../config/models')
const categoriesController = require('../controllers/categories-controller')

const getAll = {
    schema: {
        tags: ['categories'],
        response: {
            200: {
                type: "array",
                items: CategoryResponse
            },
            400: ErrorResponse,
        },
    },
    handler: categoriesController.getAll,
}

const create = {
    schema: {
        tags: ['categories'],
        response: {
            200: CategoryResponse,
            400: ErrorResponse,
        },
        body: {
            title: {type: "string"},
            path_logo: {type: "string"}
        }
    },
    handler: categoriesController.create,
}

const getId = {
    schema: {
        tags: ['categories'],
        response: {
            200: CategoryResponse,
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
        tags: ['categories'],
        response: {
            200: CategoryResponse,
            400: ErrorResponse,
        },
        params: {
            id: {type: "number"}
        },
        body: {
            title: {type: "string"},
            path_logo: {type: "string"}
        }

    },
    handler: categoriesController.update,
}

const deleteId = {
    schema: {
        tags: ['categories'],
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


function categoryRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
    fastify.get('/', getAll)
    fastify.post('/' , create)
    fastify.get('/:id', getId)
    fastify.put('/:id', update)
    fastify.delete('/:id', deleteId)

    done();
}

module.exports = categoryRouter;