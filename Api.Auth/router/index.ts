import { FastifyInstance } from 'fastify';
const { AuthResponse, ErrorResponse } = require('../config/models')
const userController = require("../controller/user-controller");


const register = {
    schema: {
        tags: ['users'],
        response: {
            200: AuthResponse,
            400: ErrorResponse,
        },
        body: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    },
    handler: userController.registration,
}

const login = {
    schema: {
        tags: ['users'],
        response: {
            200: AuthResponse,
            400: ErrorResponse,
        },
        body: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    },
    handler: userController.login,
}

const logout = {
    schema: {
        tags: ['users'],
        response: {
            200: {
                type: "object",
                properties: {
                    refreshToken: {type: "string"}
                }
            },
            400: ErrorResponse,
        },
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string', description: 'Bearer {токен} для авторизации' }
            }
        }
    },
    handler: userController.logout,
}

const refresh = {
    schema: {
        tags: ['users'],
        response: {
            200: {
                type: "object",
                properties: {
                    refreshToken: {type: "string"}
                }
            },
            400: ErrorResponse,
        },
        headers: {
            type: 'object',
            properties: {
                Authorization: { type: 'string', description: 'Bearer {токен} для авторизации' }
            }
        }
    },
    handler: userController.refresh,
}

const getById = {
    schema: {
        tags: ['users'],
        params: {
            id: { type: 'number' },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    email: {type: "string"}
                }
            },
            400: ErrorResponse,
        },

    },
    handler: userController.getUser,
}

const getAll = {
    schema: {
        tags: ['users'],
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {type: "number"},
                        email: {type: "string"}
                    }
                }
            },
            400: ErrorResponse,
        },

    },
    handler: userController.getUsers,
}


function authRouter(fastify: FastifyInstance, options: any, done: (error?: Error) => void) {
    fastify.post('/registration', register)
    fastify.post('/login', login)
    fastify.post('/logout' , logout)
    fastify.get('/refreshToken', refresh)
    fastify.get('/users', getAll)
    fastify.get('/user:id', getById)

    done();
}

module.exports = authRouter;
