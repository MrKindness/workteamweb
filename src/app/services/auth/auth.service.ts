import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { AuthResponse } from '../../model/auth/auth-response';
import { Constants } from '../../utils/constants';
import { AuthRequest } from '../../model/auth/auth-request';
import { RouterService } from '../router.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    token: String = '';

    constructor(
        private routerService: RouterService,
        private http: HttpClient
    ) {}

    authUser(username: string, password: string): Observable<Boolean> {
        if (username && password) {
            return this.http
                .post<AuthResponse>(
                    Constants.apiPath + Constants.authPage,
                    new AuthRequest(username, password)
                )
                .pipe(
                    map((param) => {
                        this.setSession(param.token);
                        return true;
                    }),
                    catchError(async (err) => {
                        console.log(err);
                        return false;
                    })
                );
        } else {
            return new Observable((subscriber) => {
                subscriber.next(false);
                subscriber.complete();
            });
        }
    }

    private setSession(authResult: any) {
        let decodedHeader = jwt_decode(authResult);

        const expiresAt = moment().add(
            JSON.parse(JSON.stringify(decodedHeader)).exp,
            'ms'
        );

        localStorage.setItem('id_token', authResult);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
    }

    logoutUser() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.routerService.navigateUrl(Constants.authPage);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        }
        return;
    }
}
