require('dotenv').config()

const Fastify = require('fastify')
const cors = require('fastify-cors')
const swagger = require('fastify-swagger')
const fastify = Fastify()

const PORT = process.env.PORT || 3000;

fastify.register(cors, {
    credentials: true,
    origin: [
        "https://hackaton-yakse.ru",
        "https://www.hackaton-yakse.ru",
    ],
});

fastify.register(swagger, {
    exposeRoute: true,
    routePrefix: '/products',
    swagger: {
        info: {
            title: "Сервис работы с ресурсами",
            version: '0.1.0',
            description: 'В данной сервисе хранится информация о всех категориях, о всех типов товаров, о всех списком и предметов, а также другая информация, относящаяся к основной бизнес-логике',
        },
        externalDocs: {
            url: 'https://hackaton-yakse.ru/products',
        },
    },
});
//
fastify.register(require('./routers/categories'), { prefix: '/products/api/categories' });
fastify.register(require('./routers/typeItem'), { prefix: '/products/api/typeItem' });
fastify.register(require('./routers/lists'), { prefix: '/products/api/lists' });
fastify.register(require('./routers/items'), { prefix: '/products/api/items' });
fastify.register(require('./routers/units'), { prefix: '/products/api/units' });
fastify.register(require('./routers/itemsAllergya'), { prefix: '/products/api/allergy' });


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
