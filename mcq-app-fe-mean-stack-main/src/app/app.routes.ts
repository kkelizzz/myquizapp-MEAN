
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from '../home/home.component';



export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', loadComponent: () => import('./user/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent), canActivate: [AuthGuard] },
  { path: 'admin', loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [AuthGuard, AdminGuard]},
  {
    path: 'admin/test-management',
    loadComponent: () => import('./admin/test-management/test-management.component').then(m => m.TestManagementComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/test-management/add',
    loadComponent: () => import('./admin/test-management/add-test.component').then(m => m.AddTestComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/test-management/edit/:id',
    loadComponent: () => import('./admin/test-management/edit-test.component').then(m => m.EditTestComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/test-management/:testId/questions',
    loadComponent: () =>
      import('./admin/test-management/question-management/question-list/question-list.component').then(m => m.QuestionListComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/test-management/:testId/questions/add',
    loadComponent: () => import('./admin/test-management/question-management//add-question/add-question.component').then(m => m.AddQuestionComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/test-management/:testId/questions/edit/:questionId',
    loadComponent: () => import('./admin/test-management/question-management//edit-question/edit-question.component').then(m => m.EditQuestionComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/admin-report',
    loadComponent: () => import('./admin/admin-report/test-list/test-list.component').then(m => m.TestListComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/admin-report/test/:testId',
    loadComponent: () => import('./admin/admin-report/admin-report.component').then(m => m.AdminReportComponent),
    canActivate: [AuthGuard, AdminGuard]
  },

  { path: 'user/user-test', 
    loadComponent: () => import('./user/user-test/user-test-list/user-test-list.component').then(m => m.UserTestListComponent),
    canActivate: [AuthGuard]
  },

  { path: 'user/tests/:testId',
    loadComponent: () => import('./user/user-test/take-test/take-test.component').then(m => m.TakeTestComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'user/user-report',
    loadComponent: () => import('./user/user-report/user-report.component').then(m => m.UserReportComponent),
    canActivate: [AuthGuard]
  }
  
  
  
  
];


