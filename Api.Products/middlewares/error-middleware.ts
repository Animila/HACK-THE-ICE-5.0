// @ts-ignore
const ApiError = require('../utils/api-error')

module.exports = function (err: any, req: any, reply: any) {
    console.log(err)
    if(err instanceof ApiError) {
        return reply.status(err.status).send({message: err.message, errors: err.errors})
    }
    return reply.status(500).send({message: "Непредвиденная ошибка сервера"})
}