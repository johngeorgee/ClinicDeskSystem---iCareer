import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MockDataService } from '../../services/mock-data.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients implements OnInit {
  private dataService = inject(MockDataService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['nationalId', 'fullName', 'phone', 'department', 'assignedDoctor', 'status', 'actions'];
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchQuery: string = '';

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = this.dataService.getPatients();
    this.filterPatients();
  }

  filterPatients() {
    if (!this.searchQuery.trim()) {
      this.filteredPatients = [...this.patients];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredPatients = this.patients.filter(p => p.id.toLowerCase().includes(query));
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterPatients();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(PatientDialog, {
      width: '500px',
      data: { isEdit: false, patient: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Simple mapping for fullName to firstName/lastName for mock
        const names = result.fullName.split(' ');
        const newPatient: Patient = {
          id: result.nationalId,
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          phone: result.phone,
          department: result.department,
          assignedDoctor: result.assignedDoctor,
          status: 'Scheduled',
          gender: 'male',
          dateOfBirth: '2000-01-01',
          registeredAt: new Date().toISOString().split('T')[0]
        };
        this.dataService.addPatient(newPatient);
        this.loadPatients();
      }
    });
  }

  openEditDialog(patient: Patient) {
    const dialogRef = this.dialog.open(PatientDialog, {
      width: '500px',
      data: { 
        isEdit: true, 
        patient: {
          nationalId: patient.id,
          fullName: `${patient.firstName} ${patient.lastName}`.trim(),
          phone: patient.phone,
          department: patient.department,
          assignedDoctor: patient.assignedDoctor
        } 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const names = result.fullName.split(' ');
        const updatedPatient: Patient = {
          ...patient,
          firstName: names[0] || '',
          lastName: names.slice(1).join(' ') || '',
          phone: result.phone,
          department: result.department,
          assignedDoctor: result.assignedDoctor
        };
        this.dataService.updatePatient(updatedPatient);
        this.loadPatients();
      }
    });
  }

  openDeleteDialog(patient: Patient) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.dataService.deletePatient(patient.id);
        this.loadPatients();
      }
    });
  }
}

// ----------------------------------------------------------------------
// Patient Form Dialog Component
// ----------------------------------------------------------------------
@Component({
  selector: 'app-patient-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  template: `
    <h2 mat-dialog-title>{{ data.isEdit ? 'Edit Patient' : 'Add New Patient' }}</h2>
    <mat-dialog-content>
      <form #patientForm="ngForm" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>National ID</mat-label>
          <input matInput name="nationalId" [(ngModel)]="formData.nationalId" required [disabled]="data.isEdit">
          <mat-error>National ID is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Full Name</mat-label>
          <input matInput name="fullName" [(ngModel)]="formData.fullName" required>
          <mat-error>Full Name is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Phone Number</mat-label>
          <input matInput name="phone" [(ngModel)]="formData.phone" required>
          <mat-error>Phone Number is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Department</mat-label>
          <input matInput name="department" [(ngModel)]="formData.department" required>
          <mat-error>Department is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Assigned Doctor</mat-label>
          <input matInput name="assignedDoctor" [(ngModel)]="formData.assignedDoctor" required>
          <mat-error>Assigned Doctor is required</mat-error>
        </mat-form-field>
      </form>
      @if (!data.isEdit && errorMessage) {
        <div class="error-message">{{ errorMessage }}</div>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="!patientForm.form.valid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }
    .full-width {
      width: 100%;
    }
    .error-message {
      color: var(--color-danger);
      margin-top: 8px;
      font-size: 0.875rem;
    }
  `]
})
export class PatientDialog {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<PatientDialog>);
  dataService = inject(MockDataService);
  
  formData: any = { ...this.data.patient };
  errorMessage = '';

  /*
  1. Report
        Feature

        Patient Management → Edit Patient

        Bug Description

        When editing an existing patient's information through the Edit Patient dialog and clicking Save, the dialog closed successfully, but the updated information was not reflected in the Patients table. The old values continued to be displayed until the page was manually refreshed.

  2. Expected Output

      After clicking Save:

      The selected patient's information should be updated.
      The Patients table should immediately display the modified values.
      No page refresh should be required.

  3. What's Really Shown

      Observed behavior:

      The edit dialog closed successfully.
      No error messages appeared.
      The Patients table continued displaying the old patient information.
      Changes only appeared after manually refreshing or reloading the data.
  
  4. Fixing Steps
      Step 1 : Verified that the edit dialog returned the updated patient object after clicking Save. 
      Step 2 : Checked the update logic inside MockDataService.
        - Found that the edited object was being modified locally, but the service data was not replacing the original patient record correctly.
        - Updated the service to replace the existing patient using its unique identifier. 
      Step 3 : Reviewed the Patients component.
        - Found that the Material Table data source was not refreshed after updating the patient.
        - Updated the component to reload or refresh the data source immediately after a successful update.
      Step 4 : Retested multiple edit operations.

        * Verified:
        - Edit patient name
        - Edit phone number
        - Edit department
        - Edit assigned doctor
        Confirmed that every modification was reflected instantly in the table.

  5. Real Result After Fix

      After implementing the fix:

      - Patient information updates correctly.
      - Material Table refreshes immediately.
      - No page reload is required.
      - MockDataService remains synchronized with the displayed data.
      - Multiple consecutive edits work correctly without inconsistencies.     
   */

  save() {
    // Validate uniqueness of National ID on Add
    if (!this.data.isEdit) {
      const existing = this.dataService.getPatientById(this.formData.nationalId);
      if (existing) {
        this.errorMessage = 'National ID already exists.';
        return;
      }
    }
    this.dialogRef.close(this.formData);
  }
}

// ----------------------------------------------------------------------
// Confirm Delete Dialog Component
// ----------------------------------------------------------------------
@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this patient?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeleteDialog {}
