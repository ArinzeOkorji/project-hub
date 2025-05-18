import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseModalComponent } from './response-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('ResponseModalComponent', () => {
  let component: ResponseModalComponent;
  let fixture: ComponentFixture<ResponseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResponseModalComponent,
        MatDialogModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            header: 'Test Header',
            body: 'Test Body',
            icon: 'check_circle'
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
