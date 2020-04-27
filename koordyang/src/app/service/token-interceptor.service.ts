import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let token = authService.getToken();
    //To View Token Send Through the requests
    //console.log("Token Send through request",token);
    if (!token) {
      let tokenizedReq = req.clone({
        setHeaders: {
          "auth-token": "",
        },
      });
      return next.handle(tokenizedReq);
    } else {
      let tokenizedReq = req.clone({
        setHeaders: {
          "auth-token": token,
        },
      });
      return next.handle(tokenizedReq);
    }
  }
}
