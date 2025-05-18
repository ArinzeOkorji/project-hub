import { Component, effect, inject, Injector, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ProjectsService } from '../../services/projects/projects.service';
import { IProject } from '../../core/interfaces/project';
import { UtilityService } from '../../services/utility/utility.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  imports: [
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
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly projectsService = inject(ProjectsService);
  private readonly utilityService = inject(UtilityService);
  searchKeyword = '';
  displayedColumns = ['name', 'description', 'dateCreated', 'actions',];
  dataSource: IProject[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get projectsData() {
    return this.projectsService.projects$();
  }

  constructor(
  ) {
    effect(() => {
      this.dataSource = this.projectsData.data as IProject[];
    });
  }

  ngAfterViewInit() {
    this.getProjects();
  }

  addProject() {
    const options = {
      data: {
        header: 'Add',
        id: null
      }
    }
    const dialogRef = this.utilityService.openDialog(ProjectFormComponent, options)
  }
  editProject(id: number) {
    const options = {
      data: {
        header: 'Edit',
        id
      }
    }
    const dialogRef = this.utilityService.openDialog(ProjectFormComponent, options)
  }

  getProjects() {
    const query = {
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      search: this.searchKeyword
    }
    this.projectsService.getProjects(query);
  }

  changePage(event: PageEvent) {

    this.getProjects();
  }

  searchProjects() {
    this.paginator.firstPage();
    this.getProjects();
  }

  deleteProject(id: number) {
    const options = {
      data: {
        header: 'Delete Project Confirmation',
        body: 'Are you sure you want to delete this project?'
      }
    }
    const dialogRef = this.utilityService.openDialog(ConfirmationDialogComponent, options);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this.projectsService.deleteProject(id);
      }
    });
  }

  clearSearch() {
    this.searchKeyword = '';
    this.paginator.firstPage();
    this.getProjects();
  }
}
