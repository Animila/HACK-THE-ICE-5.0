module.exports = class UserDto {
    email: string;
    id: number;

    constructor(model: { email: string, id: number }) {
        this.email = model.email;
        this.id = model.id;
    }
}