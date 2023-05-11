import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { catchError, filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {}

    getVisibleUsers(): User[] {
        return [new User()];
    }

    getAllUsers(): User[] {
        return [new User()];
    }

    getUserByUsername(username: string): User | undefined {
        return new User();
    }

    saveUser(user: User, password: string) {}

    updateUser(username: string, newData: User, password?: string): void {}

    deleteUser(username: string): void {}

    getLoggedUser(): Observable<User> {
        return this.http
            .get<User>(Constants.apiPath + Constants.userDetailsRequest)
            .pipe(
                catchError(async (error) => {
                    console.log(error);
                    this.authService.logoutUser();
                    return new User();
                })
            );
    }
}
