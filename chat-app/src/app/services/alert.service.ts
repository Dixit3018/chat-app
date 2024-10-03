import { Injectable } from '@angular/core';
import { AlertComponent, AlertContentComponent } from '../shared/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  openAlert(alert: { message: string; type: 'error' | 'success' | 'warning' }) {
    this.snackBar.openFromComponent(AlertContentComponent, {
      data: {message: alert.message, type: alert.type},
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
