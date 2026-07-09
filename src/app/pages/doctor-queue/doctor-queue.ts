import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MockDataService } from '../../services/mock-data.service';
import { MatDivider } from '@angular/material/divider';
interface QueueItem {
  patientId: string;
  appointmentId: string;
  name: string;
  nationalId: string;
  department: string;
  appointmentTime: string;
  status: string;
  assignedDoctor: string;
  notes: string;
}

@Component({
  selector: 'app-doctor-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, ...MATERIAL_IMPORTS, MatDivider],
  templateUrl: './doctor-queue.html',
  styleUrl: './doctor-queue.css',
})
export class DoctorQueue implements OnInit {
  private dataService = inject(MockDataService);

  queueItems: QueueItem[] = [];
  selectedItem: QueueItem | null = null;
  editingNotes = '';

  ngOnInit() {
    this.loadQueue();
  }

  loadQueue() {
    const today = '2024-07-15';
    const allAppointments = this.dataService.getAppointments().filter(a => a.date === today);
    const allPatients = this.dataService.getPatients();

    this.queueItems = [];

    allPatients.forEach(patient => {
      const appointment = allAppointments.find(a => a.patientId === patient.id);
      const pStatus = (patient.status || '').toLowerCase();

      if (pStatus === 'checked-in' || pStatus === 'in consultation') {
        const appointmentTime = this.getAppointmentTime(appointment);

        this.queueItems.push({
          patientId: patient.id,
          appointmentId: appointment ? appointment.id : '',
          name: `${patient.firstName} ${patient.lastName}`,
          nationalId: patient.id,
          department: patient.department || 'General',
          appointmentTime,
          status: patient.status || 'Unknown',
          assignedDoctor: patient.assignedDoctor || 'Unassigned',
          notes: appointment?.notes || ''
        });
      }
    });

    this.queueItems.sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));

    // Refresh selected item reference if it still exists in the queue
    if (this.selectedItem) {
      const stillExists = this.queueItems.find(i => i.patientId === this.selectedItem!.patientId);
      if (stillExists) {
        this.selectItem(stillExists);
      } else {
        this.selectedItem = null;
      }
    }
  }

  private getAppointmentTime(appointment: { startTime?: string } | undefined): string {
    if (!appointment?.startTime) {
      return this.getMockAppointmentTime(this.queueItems.length);
    }

    return this.formatTime(appointment.startTime);
  }

  private getMockAppointmentTime(index: number): string {
    const mockTimes = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:30 AM'];
    return mockTimes[index % mockTimes.length];
  }

  private formatTime(value: string): string {
    if (!value) {
      return 'N/A';
    }

    const [hours, minutes] = value.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const normalizedHours = hours % 12 || 12;

    return `${normalizedHours}:${String(minutes).padStart(2, '0')} ${suffix}`;
  }

  selectItem(item: QueueItem) {
    this.selectedItem = item;
    this.editingNotes = item.notes;
  }

  saveNotes() {
    if (this.selectedItem && this.selectedItem.appointmentId) {
      this.dataService.updateAppointmentNotes(this.selectedItem.appointmentId, this.editingNotes);
      this.selectedItem.notes = this.editingNotes;
      // Optional toast/snackbar could go here, but omitted for simplicity
    }
  }

  completeVisit() {
    if (this.selectedItem) {
      this.dataService.completePatientVisit(this.selectedItem.patientId);
      this.loadQueue(); // This will remove them from the queue view since status is now Completed
      this.selectedItem = null;
    }
  }
}
