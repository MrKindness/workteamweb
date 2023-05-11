export class Team {
    name: string;
    users: string[];

    constructor(name: string = '', users: string[] = []) {
        (this.name = name), (this.users = users);
    }

    static clone(team: Team): Team {
        return new Team(team.name, Object.assign([], team.users));
    }
}
