import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProjectsService } from '../../services/projects/projects.service';

fdescribe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsComponent,
        MatButtonModule,
        MatIcon,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        DatePipe,
        RouterLink,
        SlicePipe
      ],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            projects$: () => ({
              data: [
                { id: 1, name: 'Project 1', description: 'Description 1', dateCreated: new Date() },
                { id: 2, name: 'Project 2', description: 'Description 2', dateCreated: new Date() },
              ]
            }),
            getProjects: () => {
              return {
                data: [
                  { id: 1, name: 'Project 1', description: 'Description 1', dateCreated: new Date() },
                  { id: 2, name: 'Project 2', description: 'Description 2', dateCreated: new Date() },
                ]
              };
            },
          }
        },
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined projectsData', () => {
    expect(component.projectsData).toBeDefined();
  });

  it('should call addProject when addProject is called', () => {
    const addProjectSpy = spyOn(component, 'addProject').and.callThrough();
    component.addProject();
    expect(addProjectSpy).toHaveBeenCalled();
  });

  it('should call editProject when editProject is called', () => {
    const editProjectSpy = spyOn(component, 'editProject').and.callThrough();
    component.editProject(1);
    expect(editProjectSpy).toHaveBeenCalled();
  });

  it('should call getProjects when getProjects is called', () => {
    const projectService = TestBed.inject(ProjectsService);
    const getProjectsSpy = spyOn(component, 'getProjects').and.callThrough();
    
    const getProjectsServicdSpy = spyOn(projectService, 'getProjects').and.callThrough();
    component.getProjects();
    expect(getProjectsSpy).toHaveBeenCalled();
    expect(getProjectsServicdSpy).toHaveBeenCalled();
  });
});
