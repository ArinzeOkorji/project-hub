import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ITask } from '../../core/interfaces/task';
import { IApiResponse } from '../../core/interfaces/apiResponse';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private utlityService = inject(UtilityService);

  private projectTasks = signal<Partial<IApiResponse<ITask[]>>>({});
  projectTasks$ = this.projectTasks.asReadonly();

  private singleTaskSignal = signal<Partial<IApiResponse<ITask>>>({});
  singleTaskSignal$ = this.singleTaskSignal.asReadonly();

  private isTaskAdded = signal<boolean>(false);
  isTaskAdded$ = this.isTaskAdded.asReadonly();

  private isTaskEdited = signal<boolean>(false);
  isTaskEdited$ = this.isTaskEdited.asReadonly();

  private isTaskDeleted = signal<boolean>(false);
  isTaskDeleted$ = this.isTaskDeleted.asReadonly();

  constructor(
    private readonly http: HttpClient
  ) { }

  getProjectTasks(projectId: number) {
    this.http.get<IApiResponse<ITask[]>>(`/api/tasks?projectId=${projectId}`)
    .subscribe({
      next: (res) => {
        this.projectTasks.set(res)

      }
    })
  }

  getTaskById(taskId: number) {
    this.singleTaskSignal.set({});
    this.http.get<IApiResponse<ITask>>(`/api/tasks/${taskId}`)
    .subscribe({
      next: (res) => {
        this.singleTaskSignal.set(res);
      }
    })
  }

  deleteTask(taskId: number, projectId: number) {
    const loaderModal = this.utlityService.openLoader();
    this.http.delete<ITask>(`/api/tasks/${taskId}`)
    .subscribe({
      next: (res) => {
        loaderModal.close();
        this.isTaskDeleted.set(true);
        this.getProjectTasks(projectId);
        setTimeout(() => {  
          this.isTaskDeleted.set(false);
        }, 0);
      },
      error: (err) => {
        loaderModal.close();
        
      }
    })
  }

  updateTaskStatus(task: ITask) {
    this.http.put<ITask>(`/api/tasks/${task.id}`, task)
    .subscribe({
      next: (res) => {
        this.getProjectTasks(task.projectId);
      }
    })
  }

  addTask(task: ITask) {
    const loaderModal = this.utlityService.openLoader();
    this.http.post<ITask>(`/api/tasks`, task)
    .subscribe({
      next: (res) => {
        loaderModal.close();
        this.isTaskAdded.set(true);
        this.getProjectTasks(task.projectId);
        setTimeout(() => {  
          this.isTaskAdded.set(false);
        }, 0);
      },
      error: (err) => {
        loaderModal.close();
        
      }
    })
  }

  editTask(task: ITask) {
    const loaderModal = this.utlityService.openLoader();
    this.http.put<ITask>(`/api/tasks/${task.id}`, task)
    .subscribe({
      next: (res) => {
        loaderModal.close();
        this.isTaskEdited.set(true);
        this.getProjectTasks(task.projectId);
        setTimeout(() => {  
          this.isTaskEdited.set(false);
        }, 0);
      },
      error: (err) => {
        loaderModal.close();
        
      }
    })
  }
}
