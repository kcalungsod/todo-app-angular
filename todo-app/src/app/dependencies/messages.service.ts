import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar) { }

  duration: number = 3000;
  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", { duration: this.duration });
  }
}
