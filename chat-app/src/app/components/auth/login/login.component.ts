import { Component, computed, effect, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ILoginDTO } from '../../../models/user.model';
import { AuthStore } from '../../../store/auth.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authStore = inject(AuthStore);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    effect(() => {
      if (this.authStore.isLoggedIn()) {
        this.router.navigate(['chat']);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const payload: ILoginDTO = {
        username: formValue.username,
        password: formValue.password,
      };

      this.authStore.login(payload);
    }
  }
}
