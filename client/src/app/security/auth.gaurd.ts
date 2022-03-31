import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SessionQuery } from "../store/session.query";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private sessionQuery: SessionQuery, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

        // Boolean value

        var isAdmin = this.sessionQuery.isAdmin;

        if (!isAdmin) {
            this.router.navigate(['/'])
        }

        return isAdmin;
    }
}