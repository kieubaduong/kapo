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
    private fb: FormBuilder
  ) {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', Validators.required)
    // });
  }

  loginWithEmail(): void {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;

      this.http
        .post('http://localhost:8080/login/email', payload, {
          responseType: 'text',
        })
        .subscribe(
          (response) => {
            console.log(JSON.stringify(response));
            const user = JSON.parse(response);
            delete user.password;
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log(JSON.stringify(error));
            this._snackBar.open(error['error'], 'Close', {});
          }
        );
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
