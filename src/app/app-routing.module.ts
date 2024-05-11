import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const cuisineModule = () => import('./cuisine/cuisine.module').then(x => x.CuisineModule);
const photoModule = () => import('./photoscavenger/photoscavenger.module').then(x => x.PhotoModule);
const localModule = () => import('./locallegends/locallegends.module').then(x => x.LocalModule);
const craftModule = () => import('./diycraft/diycraft.module').then(x => x.CraftModule);
const TraditionModule = () => import('./localtradition/localtradition.module').then(x => x.TraditionModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'cuisine', loadChildren: cuisineModule, canActivate: [AuthGuard] },
    { path: 'photoscavenger', loadChildren: photoModule, canActivate: [AuthGuard] },
    { path: 'locallegends', loadChildren: localModule, canActivate: [AuthGuard] },
    { path: 'diycraft', loadChildren: craftModule, canActivate: [AuthGuard] },
    { path: 'localtradition', loadChildren: TraditionModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }