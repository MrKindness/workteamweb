import { RoleEnum } from '../role.enum';

export class User {
    id: string;
    username: string;
    name: string;
    email: string;
    role: RoleEnum;

    constructor(
        id: string = '',
        username: string = '',
        name: string = '',
        email: string = '',
        role: RoleEnum = RoleEnum.USER
    ) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    static clone(user: User): User {
        return new User(
            user.id,
            user.username,
            user.name,
            user.email,
            user.role
        );
    }
}
