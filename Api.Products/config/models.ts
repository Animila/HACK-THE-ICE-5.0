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

const ItemsAllergyResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        allergyId: { type: 'number' },
        itemId: { type: 'number' },
    },
};

const ItemResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: {type: 'string'},
        typeItemId: { type: 'number' },
        unitId: { type: 'number' },
        count: { type: 'number' },
        start_date: { type: 'string' },
        end_date: { type: 'string' },
        listId: { type: 'number' },
    },
};

const ChangeItemResponse = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        itemId: {type: 'number'},
        count: {type: 'number'},
        date: { type: 'string' },
        type: {type: 'string'}
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

module.exports = { CategoryResponse,ChangeItemResponse,ItemResponse,ItemsAllergyResponse, TypeItemResponse,UnitResponse,ListResponse, ErrorResponse }