import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { LoginMainContainerComponent } from './container/login-main-container/login-main-container.component';
import { NgModule } from '@angular/core';
import { FirstLoginPasswordchangeContainerComponent } from './container/first-login-passwordchange-container/first-login-passwordchange-container.component';
import { AuthenticatedLoadGuard, AuthenticatedGuard } from '../guards/authenticated.guard';
import { ForgetPasswordContainerComponent } from './container/forget-password-container/forget-password-container.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: '',
                redirectTo: 'login-main',
                pathMatch: 'full'
            },
            {
                path: 'login-main',
                component: LoginMainContainerComponent,
            },
            {
                path: 'forget-password',
                component: ForgetPasswordContainerComponent,
            },
            {
                path: 'first-time-password-change',
                component: FirstLoginPasswordchangeContainerComponent,
                canLoad: [AuthenticatedLoadGuard],
                canActivate: [AuthenticatedGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule { }