import { RoleEnum } from './role.enum';

export class User {
    username: string;
    name: string;
    email: string;
    role: RoleEnum;

    constructor(
        username: string = '',
        name: string = '',
        email: string = '',
        role: RoleEnum = RoleEnum.USER
    ) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static clone(user: User): User {
        return new User(user.username, user.name, user.email, user.role);
    }
}
