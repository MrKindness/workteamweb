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
    constructor(private authService: AuthService, private http: HttpClient) {}

    getLoggedUser(): Observable<{ error: boolean; response?: User }> {
        return this.http
            .get<User>(Constants.apiPath + Constants.userDetailsRequest)
            .pipe(
                map((result) => {
                    return { error: false, response: result };
                }),
                catchError(async (error) => {
                    console.log(error);
                    this.authService.logoutUser();
                    return { error: true, response: undefined };
                })
            );
    }

    getColleagues(): Observable<{ error: boolean; response: User[] }> {
        return this.http
            .get<User[]>(Constants.apiPath + Constants.colleaguesRequest)
            .pipe(
                map((result) => {
                    return { error: false, response: result };
                }),
                catchError(async (error) => {
                    console.log('error while loading collegues:');
                    console.log(error);
                    return { error: true, response: [] };
                })
            );
    }

    createUser(user: User): Observable<{ error: boolean; response: any }> {
        return this.http
            .post(Constants.apiPath + Constants.userRoot, user)
            .pipe(
                map((result) => {
                    return { error: false, response: 'User created!' };
                }),
                catchError(async (error) => {
                    console.log('user create error:');
                    console.log(error);

                    let response = 'User create error!';
                    try {
                        response = error.error.message;
                    } catch (ex) {}
                    return { error: true, response: response };
                })
            );
    }

    updateUser(user: User): Observable<{ error: boolean; response: any }> {
        return this.http.put(Constants.apiPath + Constants.userRoot, user).pipe(
            map((result) => {
                return { error: false, response: 'User updated!' };
            }),
            catchError(async (error) => {
                console.log('user update error:');
                console.log(error);

                let response = 'User update error!';
                try {
                    response = error.error.message;
                } catch (ex) {}
                return { error: true, response: response };
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
                    console.log('update error:');
                    console.log(error);

                    let response = 'Update error!';
                    try {
                        response = error.error.message;
                    } catch (ex) {}
                    return { error: true, response: response };
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
                    return { error: false, response: 'User deleted!' };
                }),
                catchError(async (error) => {
                    console.log('user delete error:');
                    console.log(error);

                    let response = 'User delete error!';
                    try {
                        response = error.error.message;
                    } catch (ex) {}
                    return { error: true, response: response };
                })
            );
    }

    getAllUsers(): User[] {
        return [new User()];
    }

    getUserByUsername(username: string): User | undefined {
        return new User();
    }
}
