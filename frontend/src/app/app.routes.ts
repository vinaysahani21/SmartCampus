import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AddStudent } from './components/add-student/add-student';
import { ViewStudent } from './components/view-student/view-student';
import { authGuard } from './auth-guard';
import { Department } from './components/department/department';

export const routes: Routes = [
  { path: '', component: Home }, // Default page
  { path: 'login', component: Login },
//   {path: 'home', component: Home},
{ path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'add-student', component: AddStudent },
  { path: 'view-students', component: ViewStudent },
  { path: 'courses', component: Department }, 
  { path: '**', redirectTo: '' } // Redirect unknown paths to home
];