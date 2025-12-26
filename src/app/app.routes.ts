import { App } from './app';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
     {
        path:'',
        loadComponent:() => loadRemoteModule('mfe1','./Component').then((c) => c.App)
    }
];
