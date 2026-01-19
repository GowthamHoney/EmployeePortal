import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee, EmployeeService } from '../../core/services/employee.service';

@Component({
    selector: 'app-employee',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        ConfirmDialogModule,
        InputTextModule,
        InputNumberModule,
        ToastModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {
    employees: Employee[] = [];
    employee: Employee = this.getEmptyEmployee();
    employeeDialog: boolean = false;
    submitted: boolean = false;
    loading: boolean = true;

    constructor(
        private employeeService: EmployeeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this.loading = true;
        this.employeeService.getAll().subscribe({
            next: (response) => {
                if (response.IsSuccess) {
                    this.employees = response.Data;
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: response.Message });
                }
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load employees' });
            }
        });
    }

    openNew() {
        this.employee = this.getEmptyEmployee();
        this.submitted = false;
        this.employeeDialog = true;
    }

    editEmployee(emp: Employee) {
        this.employee = { ...emp };
        this.employeeDialog = true;
    }

    deleteEmployee(emp: Employee) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + emp.FirstName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (emp.Id) {
                    this.employeeService.delete(emp.Id).subscribe((res) => {
                        if (res.IsSuccess) {
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
                            this.loadEmployees();
                        } else {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.Message });
                        }
                    });
                }
            }
        });
    }

    saveEmployee() {
        this.submitted = true;
        if (this.employee.FirstName?.trim()) {
            if (this.employee.Id) {
                this.employeeService.update(this.employee.Id, this.employee).subscribe((res) => {
                    if (res.IsSuccess) {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
                        this.employeeDialog = false;
                        this.loadEmployees();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.Message });
                    }
                });
            } else {
                this.employeeService.create(this.employee).subscribe((res) => {
                    if (res.IsSuccess) {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
                        this.employeeDialog = false;
                        this.loadEmployees();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: res.Message });
                    }
                });
            }
        }
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    getEmptyEmployee(): Employee {
        return {
            FirstName: '',
            LastName: '',
            Email: '',
            Position: '',
            Phone: '',
            Department: ''
        };
    }
}
