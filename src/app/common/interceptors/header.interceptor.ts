import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor() {
        // console.log('Inside inceptor')
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const AuthRequest = req.clone({ headers: headers });
        return next.handle(AuthRequest);

    }
}
