import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { provideHttpClient } from '@angular/common/http';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
    MatButtonModule,
    MatIcon,
    DatePipe,
    MatProgressSpinner,
    TaskDetailsComponent
  ],
  providers: [
    provideHttpClient(),
    {
      provide: MAT_DIALOG_DATA,
      useValue: {
        header: 'Test Header',
        id: null,
        projectId: 1
      }
    },
    {
      provide: MatDialogRef,
      useValue: {
        close: () => {},
      },
    },
  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
