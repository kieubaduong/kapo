import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../common/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import ApiResponse from 'src/models/api.response';
import LoginService from 'src/service/login.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  loginWithEmail(): void {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      if (payload.email && payload.password) {
        LoginService.login(payload.email, payload.password).then((response: ApiResponse<any>) => {
          if (response.success) {
            this.router.navigate(['/home']);
            this.notificationService.showSuccess('Login successful');
          } else {
            this.notificationService.showError('Login failed: ' + response.message);
          }
        });
      } else {
        this.notificationService.showError('Email and password must be provided');
      }
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

}
