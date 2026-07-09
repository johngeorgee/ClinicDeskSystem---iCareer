import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MockDataService } from '../../services/mock-data.service';

interface ScheduleViewItem {
  id: string;
  time: string;
  patientName: string;
  doctorName: string;
  department: string;
  status: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule implements OnInit {
  private dataService = inject(MockDataService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['time', 'patient', 'doctor', 'department', 'status', 'actions'];
  scheduleItems: ScheduleViewItem[] = [];

  ngOnInit() {
    this.loadSchedule();
  }

  loadSchedule() {
    // For mock purposes, 'today' is considered to be '2024-07-15'
    const today = '2024-07-15';
    const allAppointments = this.dataService.getAppointments();
    
    this.scheduleItems = allAppointments
      .filter(a => a.date === today)
      .map(app => {
        const patient = this.dataService.getPatientById(app.patientId);
        const doctor = this.dataService.getDoctorById(app.doctorId);
        
        return {
          id: app.id,
          time: app.startTime,
          patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown',
          doctorName: doctor ? `Dr. ${doctor.lastName}` : 'Unknown',
          department: doctor ? doctor.specialization : 'Unknown',
          // Defaulting old mock statuses to the new ones if necessary
          status: this.mapStatus(app.status)
        };
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  mapStatus(status: string): string {
    const s = status.toLowerCase();
    if (s === 'scheduled') return 'Scheduled';
    if (s === 'in-progress') return 'In Consultation';
    if (s === 'completed') return 'Completed';
    if (s === 'cancelled' || s === 'no-show') return 'Scheduled';
    return status;
  }

  openStatusDialog(item: ScheduleViewItem) {
    const dialogRef = this.dialog.open(StatusUpdateDialog, {
      width: '350px',
      data: { status: item.status }
    });

    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus && newStatus !== item.status) {
        // Map back to internal representation if needed, but since we are flexible:
        let internalStatus = newStatus.toLowerCase().replace(' ', '-');
        if (newStatus === 'In Consultation') internalStatus = 'in-progress';
        
        this.dataService.updateAppointmentStatus(item.id, internalStatus);
        this.loadSchedule();
      }
    });
  }
}

// ----------------------------------------------------------------------
// Status Update Dialog Component
// ----------------------------------------------------------------------
@Component({
  selector: 'app-status-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS],
  template: `
    <h2 mat-dialog-title>Update Status</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width mt-16">
        <mat-label>Current Status</mat-label>
        <mat-select [(ngModel)]="selectedStatus">
          <mat-option *ngFor="let status of statuses" [value]="status">
            {{ status }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="selectedStatus">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    .mt-16 { margin-top: 16px; }
  `]
})
export class StatusUpdateDialog {
  data = inject(MAT_DIALOG_DATA);
  selectedStatus = this.data.status;
  statuses = ['Scheduled', 'Checked-In', 'In Consultation', 'Completed'];
}
