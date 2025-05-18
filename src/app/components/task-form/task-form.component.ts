import { Component, effect, inject, Inject, Injector, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TasksService } from '../../services/tasks/tasks.service';
import { UtilityService } from '../../services/utility/utility.service';
import { ResponseModalComponent } from '../modals/response-modal/response-modal.component';
import { ITask } from '../../core/interfaces/task';

@Component({
  selector: 'app-task-form',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  taskService = inject(TasksService);
  dialogRef = inject(MatDialogRef);
  utitlityService = inject(UtilityService);
  @ViewChild('form') form!: NgForm;
  task!: ITask

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string,
      id: number | null,
      projectId: number
    },
    private readonly injector: Injector
  ) {
    
  }

  ngAfterViewInit() {
      if (this.data.id) {
        this.taskService.getTaskById(this.data.id);
        effect(() => {
          this.task = this.taskService.singleTaskSignal$().data as ITask;
          if (this.task) {
            this.form.setValue({
              name: this.task.name,
              description: this.task.description
            });
          }
        }, {
          injector: this.injector,
        });
      }
    }

  submit() {
    switch(this.data.header.toLowerCase()) {
      case 'add':
        this.addTask();
        break;
      case 'edit':
        this.editTask();
        break
    }
  }

  addTask() {
    const formData = this.form.value;
    formData.dateCreated = new Date();
    formData.status = 'To Do';
    formData.projectId = this.data.projectId;
    this.taskService.addTask(formData);

    effect(() => {
      if (this.taskService.isTaskAdded$()) {
        this.dialogRef.close();


        const options = {
          data: {
            header: 'Task Creation Successful',
            body: 'Task has been created successfully!',
            icon: 'check_circle'
          }
        }
        this.utitlityService.openDialog(ResponseModalComponent, options);
      }
    }, {
      injector: this.injector,
    });
  }

  editTask() {
    const formData = this.form.value;
    const data = {
      ...this.task,
      ...formData
    }
    this.taskService.editTask(data);


    effect(() => {
      if (this.taskService.isTaskEdited$()) {
        this.dialogRef.close();


        const options = {
          data: {
            header: 'Task Edit Successful',
            body: 'Task has been edited successfully!',
            icon: 'check_circle'
          }
        }
        this.utitlityService.openDialog(ResponseModalComponent, options);
      }
    }, {
      injector: this.injector,
    });
  }

}
