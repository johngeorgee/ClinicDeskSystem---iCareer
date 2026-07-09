import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'patients',
    loadComponent: () => import('./pages/patients/patients').then(m => m.Patients)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./pages/schedule/schedule').then(m => m.Schedule)
  },
  {
    path: 'doctor-queue',
    loadComponent: () => import('./pages/doctor-queue/doctor-queue').then(m => m.DoctorQueue)
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.Reports)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  }
];
