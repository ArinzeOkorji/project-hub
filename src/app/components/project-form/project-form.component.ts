import { Component, effect, inject, Inject, Injector, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectsService } from '../../services/projects/projects.service';
import { UtilityService } from '../../services/utility/utility.service';
import { ResponseModalComponent } from '../modals/response-modal/response-modal.component';
import { IProject } from '../../core/interfaces/project';

@Component({
  selector: 'app-project-form',
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  projectService = inject(ProjectsService);
  dialogRef = inject(MatDialogRef);
  utitlityService = inject(UtilityService);
  @ViewChild('form') form!: NgForm;
  project!: IProject

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string,
      id: number | null
    },
    private readonly injector: Injector
  ) {
    
  }

  ngAfterViewInit() {
    if (this.data.id) {
      this.projectService.getProjectById(this.data.id);
      effect(() => {
        this.project = this.projectService.singleProject$().data as IProject;
        if (this.project) {
          this.form.setValue({
            name: this.project.name,
            description: this.project.description,
            // status: this.project.status
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
        this.addProject();
        break;
      case 'edit':
        this.editProject();
        break
    }
  }

  addProject() {
    const formData = this.form.value;
    formData.dateCreated = new Date();
    formData.status = 'Active';
    this.projectService.addProject(formData);

    effect(() => {
      if (this.projectService.isProjectAdded$()) {
        this.dialogRef.close();


        const options = {
          data: {
            header: 'Project Creation Successful',
            body: 'Project has been created successfully!',
            icon: 'check_circle'
          }
        }
        this.utitlityService.openDialog(ResponseModalComponent, options);
      }
    }, {
      injector: this.injector,
    });
  }

  editProject() {
    const formData = this.form.value;
    const data = {
      ...this.project,
      ...formData
    }
    this.projectService.editProject(this.project.id, data);


    effect(() => {
      if (this.projectService.isProjectEdited$()) {
        this.dialogRef.close();


        const options = {
          data: {
            header: 'Project Edit Successful',
            body: 'Project has been edited successfully!',
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
