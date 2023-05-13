import { Injectable } from '@angular/core';
import { Team } from '../model/team';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) {}

    getTeams(): Observable<{ error: boolean; response: Team[] }> {
        return this.http
            .get<Team[]>(Constants.apiPath + Constants.teamsRequest)
            .pipe(
                map((result) => {
                    return { error: false, response: result };
                }),
                catchError(async (error) => {
                    console.log('error while loading teams:');
                    console.log(error);
                    return { error: true, response: [] };
                })
            );
    }

    getTeamByName(name: string): Team | undefined {
        return new Team();
    }

    saveTeam(team: Team) {}

    updateTeam(name: string, newData: Team): void {}

    deleteTeam(name: string): void {}
}
