import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'projects',
                loadComponent: () => import('./components/projects/projects.component').then(m => m.ProjectsComponent)
            },
            {
                path: 'project/:id',
                loadComponent: () => import('./components/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
            },
            {
                path: '',
                redirectTo: 'projects',
                pathMatch: 'full'
            }
        ]
    }
];
