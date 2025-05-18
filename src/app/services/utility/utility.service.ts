import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoaderModalComponent } from '../../components/modals/loader-modal/loader-modal.component';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private readonly dialogService: MatDialog,
    private readonly location: Location
  ) { }

  openDialog(component: ComponentType<any>, options?: MatDialogConfig<any>) {
    const option = {
      closeOnNavigation: true,
      width: window.innerWidth > 768 ? '40vw' : '90vw',
      height: window.innerWidth > 768 ? '70vh' : '90vh',
      ...options,
    }
    return this.dialogService.open(component, option);
  } 

  openLoader() {
    return this.openDialog(LoaderModalComponent, {
      width: '30vw'
    })
  }

  goBack() {
    this.location.back();
  }
}
