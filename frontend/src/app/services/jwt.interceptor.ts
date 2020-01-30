import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class JWTInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.isLogin();

        const url = `${environment.baseAPIURL}v1/`
        req = req.clone({
            url: `${url}${req.url}`
        })

        if (jwtToken) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'bearer ' + jwtToken)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }

}