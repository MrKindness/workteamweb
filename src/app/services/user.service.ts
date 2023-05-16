import { Injectable } from '@angular/core';
import { User } from '../model/user/user';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserEdit } from '../model/user/user-edit';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    loggedUser?: User;

    getLoggedUser(): Observable<{ error: boolean; response?: User }> {
        return this.http
            .get<User>(Constants.apiPath + Constants.userDetailsRequest)
            .pipe(
                map((result) => {
                    this.loggedUser = result;
                    return { error: false, response: result };
                }),
                catchError(async (error) => {
                    console.log(error);
                    this.loggedUser = undefined;
                    return { error: true, response: undefined };
                })
            );
    }

    getColleagues(): Observable<{ error: boolean; response: any }> {
        return this.http
            .get(Constants.apiPath + Constants.colleaguesRequest)
            .pipe(
                map((result) => {
                    return { error: false, response: result };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(
                            error,
                            'Error while loading colleagues! Try to re-login!'
                        ),
                    };
                })
            );
    }

    createUser(user: User): Observable<{ error: boolean; response: any }> {
        return this.http
            .post(Constants.apiPath + Constants.userRoot, user)
            .pipe(
                map((result) => {
                    return { error: false, response: 'User was created!' };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(
                            error,
                            'User create error!'
                        ),
                    };
                })
            );
    }

    updateUser(user: User): Observable<{ error: boolean; response: any }> {
        return this.http.put(Constants.apiPath + Constants.userRoot, user).pipe(
            map((result) => {
                return { error: false, response: 'User was updated!' };
            }),
            catchError(async (error) => {
                return {
                    error: true,
                    response: this.getErrorMessage(error, 'User update error!'),
                };
            })
        );
    }

    updateUserSelf(
        user: UserEdit
    ): Observable<{ error: boolean; response: any }> {
        return this.http
            .put(Constants.apiPath + Constants.updateSelfRequest, user)
            .pipe(
                map((result) => {
                    return {
                        error: false,
                        response: 'Information was updated! Sign in please!',
                    };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(error, 'Update error!'),
                    };
                })
            );
    }

    deleteUser(
        username: string
    ): Observable<{ error: boolean; response: any }> {
        return this.http
            .delete(Constants.apiPath + Constants.userRoot + '/' + username)
            .pipe(
                map((result) => {
                    return { error: false, response: 'User was deleted!' };
                }),
                catchError(async (error) => {
                    return {
                        error: true,
                        response: this.getErrorMessage(
                            error,
                            'User delete error!'
                        ),
                    };
                })
            );
    }

    getErrorMessage(errorObject: any, defaultValue: any): string {
        console.log(errorObject);

        let response = defaultValue;
        try {
            response = response || errorObject.error.error;
        } catch (ex) {}

        if (errorObject.status == '401') {
            response += ' Your session has expired, you need to re-login!';
        }

        return response;
    }
}
