import {
    HTTP_INTERCEPTORS,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken),
            });
        }

        return next.handle(req);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
