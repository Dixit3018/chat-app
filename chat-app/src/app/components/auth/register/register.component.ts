import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ISignupDTO } from '../../../models/user.model';
import { AuthStore } from '../../../store/auth.store';
import { emailPattern } from '../../../regex';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  authStore = inject(AuthStore);
  signupForm!: FormGroup;
  selectedFile: File | null = null;

  router = inject(Router);

  constructor(private fb: FormBuilder) {
    effect(() => {
      if (this.authStore.isLoggedIn()) {
        this.router.navigate(['chat']);
      }
    });
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(emailPattern)]],
    })
  }

  onFileChange(event: Event){
    const target  = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
    else {
      this.selectedFile = null;
    }
  }

  onRegister() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const payload: FormData = new FormData();
      Object.keys(formValue).forEach(key => {
        payload.append(key, formValue[key])
      });
      payload.append("image", this.selectedFile ?? "")

      this.authStore.signup(payload);
    }
  }
}
