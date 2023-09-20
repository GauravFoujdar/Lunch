import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isWrongPassword: boolean = false;
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  public loginForm = this.formBuilder.group({
    username: this.usernameControl,
    password: this.passwordControl,
  });

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.http
      .post<IUser>('http://localhost:3000/api/login', {
        userName: this.usernameControl.value,
        password: this.passwordControl.value,
      })
      .subscribe(
        (response) => {
          this.auth.setUserName = response.userName;
          this.auth.setUserType= response.userType;
          this.auth.setUserAuthentication = true;
          this.dialogRef.close();
        },
        () => {
          this.isWrongPassword = true;
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
