import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        PasswordModule
    ],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            Username: ['', [Validators.required]],
            Password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;

            let obj = {
                Username: this.loginForm.value.Username,
                Password: this.loginForm.value.Password
            }
            this.authService.login(obj).subscribe({
                next: (res) => {
                    this.loading = false;
                    if (res.IsSuccess) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
                        setTimeout(() => {
                            this.router.navigate(['/employees']);
                        }, 500);
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.Message || 'Login failed' });
                    }
                },
                error: (err) => {
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials or server error' });
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
