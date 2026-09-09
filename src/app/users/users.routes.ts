import { Routes } from '@angular/router';
import { resolveUserTasks } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
    // component: TasksComponent,
    runGuardsAndResolvers: 'always',
    // resolve executes when route param changes
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
