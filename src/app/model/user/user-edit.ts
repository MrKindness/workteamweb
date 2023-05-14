export class UserEdit {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    newPassword: string;

    constructor(
        id: string = '',
        username: string = '',
        name: string = '',
        email: string = '',
        password: string = '',
        newPassword: string = ''
    ) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.newPassword = newPassword;
    }
}
