const CategoryResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        path_logo: { type: 'string' },
    },
};

const TypeItemResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        default_day: {type: 'number'},
        path_logo: { type: 'string' },
    },
};

const UnitResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
    },
};

const ListResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        userId: { type: 'number' },
    },
};

const ErrorResponse = {
    type: 'object',
    properties: {
        statusCode: {type: "number"},
        error: {type: "string"},
        message: {type: 'string'}
    }
}

module.exports = { CategoryResponse, TypeItemResponse,UnitResponse,ListResponse, ErrorResponse }