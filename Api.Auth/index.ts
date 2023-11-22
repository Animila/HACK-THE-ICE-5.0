require('dotenv').config()

const Fastify = require('fastify')
const cors = require('fastify-cors')
const swagger = require('fastify-swagger')
const fastify = Fastify()

const PORT = process.env.PORT || 4000;

fastify.register(cors, {
    credentials: true,
    origin: [
        "https://hackaton-yakse.ru",
        "https://www.hackaton-yakse.ru",
    ],
});

fastify.register(swagger, {
    exposeRoute: true,
    routePrefix: '/auth',
    swagger: {
        info: {
            title: "Сервис работы с пользовательскими данными",
            version: '0.1.0',
            description: 'Сервис обеспечивает систему авторизации, регистрации, аутендификации. Также здесь хранится информация касающаяся пользователя, такие как аллергии, социальные сети',
        },
        externalDocs: {
            url: 'https://hackaton-yakse.ru/auth',
        },
    },
});

fastify.register(require('./router/index'), { prefix: '/auth/api' });


const start = async () => {
    try {
        await fastify.listen({port: PORT, host: '0.0.0.0'});
        console.log(`Server started on ${PORT}`);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1);
    }
};

start();
