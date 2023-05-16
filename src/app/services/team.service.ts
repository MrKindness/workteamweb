import { Injectable } from '@angular/core';
import { Team } from '../model/team';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) {}

    getTeams(): Observable<{ error: boolean; response: any }> {
        return this.http.get(Constants.apiPath + Constants.teamsRequest).pipe(
            map((result) => {
                return { error: false, response: result };
            }),
            catchError(async (error) => {
                return {
                    error: true,
                    response: this.getErrorMessage(
                        error,
                        'Error while loading teams! Try to re-login!'
                    ),
                };
            })
        );
    }

    getUserCandidates(
        id: string
    ): Observable<{ error: boolean; response: any }> {
        let path = Constants.apiPath + Constants.candidatesRequest;
        if (id.length > 0) {
            path += '/' + id;
        }

        return this.http.get(path).pipe(
            map((result) => {
                return { error: false, response: result };
            }),
            catchError(async (error) => {
                return {
                    error: true,
                    response: this.getErrorMessage(
                        error,
                        'Error while loading candidates!'
                    ),
                };
            })
        );
    }

    createTeam(team: Team): Observable<{ error: boolean; response: any }> {
        return this.http
            .post(Constants.apiPath + Constants.teamRoot, team)
            .pipe(
                map((result) => {
                    return { error: false, response: 'Team was created!' };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(
                            error,
                            'Team create error!'
                        ),
                    };
                })
            );
    }

    updateTeam(team: Team): Observable<{ error: boolean; response: any }> {
        return this.http.put(Constants.apiPath + Constants.teamRoot, team).pipe(
            map((result) => {
                return { error: false, response: 'Team was updated!' };
            }),
            catchError(async (error) => {
                return {
                    error: true,
                    response: this.getErrorMessage(error, 'Team update error!'),
                };
            })
        );
    }

    deleteTeam(id: string): Observable<{ error: boolean; response: any }> {
        return this.http
            .delete(Constants.apiPath + Constants.teamRoot + '/' + id)
            .pipe(
                map((result) => {
                    return { error: false, response: 'Team was deleted!' };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(
                            error,
                            'Team delete error!'
                        ),
                    };
                })
            );
    }

    getErrorMessage(errorObject: any, defaultValue: any): string {
        console.log(errorObject);

        let response = defaultValue;
        try {
            response = errorObject.error.error || response;
        } catch (ex) {}

        if (errorObject.status == '401') {
            response += ' Your session has expired, you need to re-login!';
        }

        return response;
    }
}
