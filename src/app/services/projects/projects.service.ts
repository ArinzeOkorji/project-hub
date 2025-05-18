import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProject } from '../../core/interfaces/project';
import { UtilityService } from '../utility/utility.service';
import { IApiResponse } from '../../core/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  utlityService = inject(UtilityService);

  // Using signal to manage state
  private projectsSignal = signal<Partial<IApiResponse<IProject[]>>>({});
  projects$ = this.projectsSignal.asReadonly();

  private isProjectAddedSignal = signal<boolean | null>(null);
  isProjectAdded$ = this.isProjectAddedSignal.asReadonly();

  private isProjectEditedSignal = signal<boolean | null>(null);
  isProjectEdited$ = this.isProjectEditedSignal.asReadonly();

  private singleProjectSignal = signal<Partial<IApiResponse<IProject>>>({});
  singleProject$ = this.singleProjectSignal.asReadonly();

  constructor(
    private http: HttpClient
  ) { }

  getProjects(query?: { page: number, pageSize: number, search: string }) {
     this.http.get<IApiResponse<IProject[]>>(`/api/projects?page=${query?.page || 1}&limit=${query?.pageSize || 10}&search=${query?.search || ''}`)
     .subscribe((response) => {
      this.projectsSignal.set(response);
     });
  }

  addProject(project: IProject) {
    const loaderModal = this.utlityService.openLoader();
    this.http.post<IProject>('/api/projects', project)
      .subscribe({
        next: (newProject) => {
          loaderModal.close();
          this.isProjectAddedSignal.set(true);
  
          this.getProjects();
          setTimeout(() => {  
            this.isProjectAddedSignal.set(false);
          }, 0);
        },
        error: (err) => {
          
          loaderModal.close();
        }
      });
  }

  deleteProject(id: number) {
    const loaderModal = this.utlityService.openLoader();
    this.http.delete<IProject>(`/api/projects/${id}`)
      .subscribe({
        next: () => {
          loaderModal.close();
          this.getProjects();
        },
        error: () => {
          loaderModal.close();
        }
      });
  }

  getProjectById(id: number) {
    this.http.get<IApiResponse<IProject>>(`/api/projects/${id}`)
    .subscribe({
      next: (project) => {
        this.singleProjectSignal.set(project);
      },
      error: () => {
        this.projectsSignal.set({
          data: [],
          length: 0
        });
      }
    })
  }

  editProject(id: number, body: any) {
    const loaderModal = this.utlityService.openLoader();
    this.http.put(`/api/projects/${id}`, body)
    .subscribe({
      next: (res) => {
        loaderModal.close();
        this.isProjectEditedSignal.set(true);

        this.getProjects();
        
        setTimeout(() => {  
          this.isProjectEditedSignal.set(false);
        }, 0);
      },
      error: (err) => {
        loaderModal.close();
      }
    });
  }
}
