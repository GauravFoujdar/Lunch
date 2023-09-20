import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthenticationService
  ) {}

  onSubmit(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
