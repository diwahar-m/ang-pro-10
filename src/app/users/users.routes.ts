import { ResolveFn, Routes } from '@angular/router';
// import { resolveUserTasks } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

// export const resolveUserTasks: ResolveFn<Task[]> = (
//   activatedRouteSnapshot,
//   routerState,
// ) => {
//   const order = activatedRouteSnapshot.queryParams['order'];
//   const tasksService = inject(TasksService);
//   const tasks = tasksService
//     .allTasks()
//     .filter(
//       (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'),
//     );

//   if (order && order === 'asc') {
//     tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
//   } else {
//     tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
//   }

//   return tasks.length ? tasks : [];
// };

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], // service  will be loaded lazily
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
        // loadComponent: () =>
        //   import('../tasks/tasks.component').then((mod) => mod.TasksComponent),

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
    ],
  },
];
