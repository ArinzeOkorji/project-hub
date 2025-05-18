import { Component, effect, inject, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks/tasks.service';
import { ITask } from '../../core/interfaces/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { UtilityService } from '../../services/utility/utility.service';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task-details',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
    MatProgressSpinner
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  taskService = inject(TasksService);
  utilityService = inject(UtilityService);
  dialogRef = inject(MatDialogRef);

  get task() {
    return this.taskService.singleTaskSignal$().data;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      taskId: number,
      projectId: number
    }
  ) {
    effect(() => {
      if(this.taskService.isTaskDeleted$()) {
        this.dialogRef.close();
      }
    })
    
  }

  ngOnInit() {
    this.getTaskDetails();
  }

  getTaskDetails() {
    this.taskService.getTaskById(this.data.taskId);
  }

  deleteTask() {
    const options = {
      data: {
        header: 'Delete Task Confirmation',
        body: 'Are you sure you want to delete this task?'
      }
    }
    const dialogRef = this.utilityService.openDialog(ConfirmationDialogComponent, options);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.deleteTask(this.data.taskId, this.data.projectId);
      }
    });

  }

  editTask() {
    this.dialogRef.close();
    const options = {
      data: {
        header: 'Edit',
        id: this.data.taskId,
        projectId: this.data.projectId
      }
    }
    const dialogRef = this.utilityService.openDialog(TaskFormComponent, options);


  }


}
