import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, Httpevent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, denaterialize } from 'rxjs/operators';

import { AlertService } from '@app/_services';
import { Role } from '@app/_models';

const accountsKey = 'angular-10-signup-verification-boilerplate-accounts';
let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const alertService = this.alertService;

        return handleRoute();

            function handleRoute() {
                switch(true) {
                    case url.endWith('/accounts/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endWith('/accounts/refresh-token') && method === 'POST':
                        return refreshToken();
                    case url.endWith('/accounts/revoke-token') && method === 'POST':
                        return revokeToken();
                    case url.endWith('/accounts/register') && method === 'POST':
                        return register();
                    case url.endWith('/accounts/verify-email') && method === 'POST':
                        return verifiyEmail();
                    case url.endWith('/accounts/forgot-password') && method === 'POST':
                        return forgotPassword();  
                    case url.endWith('/accounts/validate-reset-token') && method === 'POST':
                        return validateResetToken();
                    case url.endWith('/accounts/reset-password') && method === 'POST':
                        return resetPassword();
                    case url.endWith('/accounts') && method === 'GET':
                        return getAccounts();
                    case url.match(/\/accounts\/\d+$/) && method === 'GET':
                        return getAccountsById();
                    case url.endWith('/accounts') && method === 'POST':
                        return createAccount();
                    case url.match(/\/accounts\/\d+$/) && method === 'PUT':
                        return updateAccount();
                    case url.match(/\/accounts\/\d+$/) && method === 'DELETE':
                        return deleteAccount();
                    default:
                            return next.handle(request);
                        
                }
            }
    }
}