import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from '../model/role.enum';
import { Team } from '../model/team';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private authService: AuthService) {}

    getVisibleTeams(): Team[] {
        return [new Team()];
    }

    getTeamByName(name: string): Team | undefined {
        return new Team();
    }

    saveTeam(team: Team) {}

    updateTeam(name: string, newData: Team): void {}

    deleteTeam(name: string): void {}
}
