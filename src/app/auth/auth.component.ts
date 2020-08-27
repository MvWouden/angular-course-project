import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  loginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.loginMode) {
      authObs = this.auth.logIn(email, password);
    } else {
      authObs = this.auth.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage,
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onClearError(): void {
    this.error = null;
  }
}
