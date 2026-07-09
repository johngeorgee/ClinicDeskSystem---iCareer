import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { MockDataService } from '../../services/mock-data.service';
import { StatCard } from '../../components/stat-card/stat-card';
import { MATERIAL_IMPORTS } from '../../material.imports';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCard, BaseChartDirective, ...MATERIAL_IMPORTS],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dataService = inject(MockDataService);

  // Statistics
  patientsToday = 0;
  waiting = 0;
  inConsultation = 0;
  completed = 0;
  doctorsAvailable = 0;
  doctorsBusy = 0;

  // Recent Activities
  recentActivities: any[] = [];

  // Chart: Visits by Doctor
  public doctorVisitsChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Appointments', backgroundColor: '#3b82f6', borderRadius: 4 }],
  };
  public doctorVisitsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  // Chart: Patient Status
  public patientStatusChartData: ChartData<'doughnut'> = {
    labels: ['Scheduled', 'In-Progress', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
      },
    ],
  };
  public patientStatusChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  ngOnInit() {
    this.calculateStats();
    this.prepareChartData();
    this.loadRecentActivities();
  }

  private calculateStats() {
    // For mock purposes, let's consider 'today' to be the most common date in our mock data: '2024-07-15'
    const today = '2024-07-15';
    const allAppointments = this.dataService.getAppointments();
    const todayAppointments = allAppointments.filter((a) => a.date === today);

    // Patients Today (unique patients with appointments today)
    const uniquePatientIds = new Set(todayAppointments.map((a) => a.patientId));
    this.patientsToday = uniquePatientIds.size;

    // Appointment Statuses for Today
    this.waiting = todayAppointments.filter((a) => a.status === 'scheduled').length;
    this.inConsultation = todayAppointments.filter((a) => a.status === 'in-progress').length;
    this.completed = todayAppointments.filter((a) => a.status === 'completed').length;

    // Doctors
    const doctors = this.dataService.getDoctors();
    this.doctorsAvailable = doctors.filter((d) => d.isAvailable).length;
    this.doctorsBusy = doctors.length - this.doctorsAvailable;
  }

  private prepareChartData() {
    const appointments = this.dataService.getAppointments();
    const doctors = this.dataService.getDoctors();

    // 1. Visits by Doctor (All time for mock data)
    const visitsMap = new Map<string, number>();
    appointments.forEach((app) => {
      visitsMap.set(app.doctorId, (visitsMap.get(app.doctorId) || 0) + 1);
    });

    this.doctorVisitsChartData.labels = doctors.map((d) => `Dr. ${d.lastName}`);
    this.doctorVisitsChartData.datasets[0].data = doctors.map((d) => visitsMap.get(d.id) || 0);

    // 2. Patient Status Breakdown
    let scheduled = 0,
      inProgress = 0,
      completed = 0,
      cancelled = 0;
    appointments.forEach((app) => {
      if (app.status === 'scheduled') scheduled++;
      else if (app.status === 'in-progress') inProgress++;
      else if (app.status === 'completed') completed++;
      else if (app.status === 'cancelled') cancelled++;
    });

    this.patientStatusChartData.datasets[0].data = [scheduled, inProgress, completed, cancelled];
  }

  private loadRecentActivities() {
    const appointments = this.dataService.getAppointments();
    // Sort by most recently created (mock data createdAt field)
    const sorted = [...appointments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Take top 5 and map to a readable format
    this.recentActivities = sorted.slice(0, 5).map((app) => {
      const patient = this.dataService.getPatientById(app.patientId);
      const doctor = this.dataService.getDoctorById(app.doctorId);
      const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
      const doctorName = doctor ? `Dr. ${doctor.lastName}` : 'Unknown Doctor';
      const actionText = this.getActivityActionText(app.status, app.type);

      return {
        id: app.id,
        patientName,
        doctorName,
        summary: `${patientName} ${actionText} ${doctorName}`,
        type: app.type,
        status: app.status,
        time: app.createdAt,
      };
    });
  }

  private getActivityActionText(status: string, type: string): string {
    switch (status) {
      case 'completed':
        return `completed ${type.toLowerCase()} with`;
      case 'in-progress':
        return 'is in consultation with';
      case 'cancelled':
        return `cancelled ${type.toLowerCase()} with`;
      default:
        return `scheduled ${type.toLowerCase()} with`;
    }
  }
}
