import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    updateUser(username: string, newData: User, password?: string): void {}
}
