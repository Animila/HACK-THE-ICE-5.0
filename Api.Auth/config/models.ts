const AuthResponse = {
    type: 'object',
    properties: {
        accessToken: {type: "string"},
        refreshToken: {type: "string"},
        user: {
            type: 'object',
            properties: {
                id: {type: "number"},
                email: {type: "string"},
            }
        }
    }
}

const ErrorResponse = {
    type: 'object',
    properties: {
        statusCode: {type: "number"},
        error: {type: "string"},
        message: {type: 'string'}
    }
}

module.exports = { AuthResponse, ErrorResponse }