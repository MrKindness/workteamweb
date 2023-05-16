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

    static teamsHaveSameUsers = (usersA: string[], usersB: string[]) => {
        if (usersA.length !== usersB.length) return false;
        const elements = new Set([...usersA, ...usersB]);
        for (const x of elements) {
            const count1 = usersA.filter((e) => e === x).length;
            const count2 = usersB.filter((e) => e === x).length;
            if (count1 !== count2) return false;
        }
        return true;
    };
}
