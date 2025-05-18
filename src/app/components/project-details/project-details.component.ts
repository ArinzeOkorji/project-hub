import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TasksService } from '../../services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../core/interfaces/task';
import { UtilityService } from '../../services/utility/utility.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ProjectsService } from '../../services/projects/projects.service';
import { DatePipe } from '@angular/common';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  imports: [
    MatIcon,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    DatePipe
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent {
  projectService = inject(ProjectsService);
  private taskService = inject(TasksService);
  private route = inject(ActivatedRoute);
  private utilityService = inject(UtilityService);
  projectId!: number;
  taskStatusGroups: any[] = [];

  get project() {
    return this.projectService.singleProject$().data;
  }

  get tasks() {
    return this.taskService.projectTasks$().data;
  }

  constructor() {
    effect(() => {
      const tasks = this.tasks;
      this.categoriseTasksByStatus('To Do');
      this.categoriseTasksByStatus('In Progress');
      this.categoriseTasksByStatus('Completed');




    })
  }

  goBack() {
    this.utilityService.goBack();
  }

  categoriseTasksByStatus(status: string) {
    const statusGroup = this.tasks?.filter(task => task.status === status) as  ITask[];
    const exisitingStatusGroupIndex = this.taskStatusGroups.findIndex(group => group.name === status);


    if(exisitingStatusGroupIndex === -1) {
      this.taskStatusGroups.push({
      name: status,
      tasks: []
    })
    } else {
      this.taskStatusGroups[exisitingStatusGroupIndex].tasks = [...statusGroup]
    }

    
  }

  ngOnInit() {
    this.route.params
    .subscribe({
      next: (param) => {
        this.projectId = +param['id'];
        this.getProjectById();
        this.getProjectTasks();
      }
    })
  }

  getProjectById() {
    this.projectService.getProjectById(this.projectId);
  } 

  getProjectTasks() {
    this.taskService.getProjectTasks(this.projectId);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateTaskStatus(event);
    }
  }

  updateTaskStatus(event: CdkDragDrop<string[]>) {
    const task = event.item.data;
    const newStatus = event.container.id;
    task.status = newStatus;
    this.taskService.updateTaskStatus(task);
  } 

  createTask() {
    const options = {
      data: {
        header: 'Add',
        id: null,
        projectId: this.projectId
      }
    }
    this.utilityService.openDialog(TaskFormComponent, options);
  }

  viewTaskDetails(taskId: number) {
    const options: MatDialogConfig = {
      disableClose: false,
      data: {
        taskId,
        projectId: this.projectId
      }
    }
    this.utilityService.openDialog(TaskDetailsComponent, options);
  }

}
