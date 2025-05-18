import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-response-modal',
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './response-modal.component.html',
  styleUrl: './response-modal.component.scss'
})
export class ResponseModalComponent {
  dialogRef = inject(MatDialogRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      header: string,
      body: string,
      icon: string
    }) { }

}
