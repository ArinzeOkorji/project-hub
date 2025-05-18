import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader-modal',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './loader-modal.component.html',
  styleUrl: './loader-modal.component.scss'
})
export class LoaderModalComponent {

}
