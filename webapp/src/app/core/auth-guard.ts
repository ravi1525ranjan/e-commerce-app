import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard : CanActivateFn = (route, state) =>{
    const authService = inject(AuthService);
    const roter = inject(Router)
    if(authService.isUserLoggedIn()){
        return true
    }else{
        roter.navigateByUrl('/login')
        return false
    }
}