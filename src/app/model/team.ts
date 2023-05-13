export class Team {
    id: string;
    name: string;
    users: string[];

    constructor(id: string = '', name: string = '', users: string[] = []) {
        this.name = name;
        this.users = users;
        this.id = id;
    }

    static clone(team: Team): Team {
        return new Team(team.id, team.name, Object.assign([], team.users));
    }
}
