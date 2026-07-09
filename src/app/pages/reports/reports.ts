import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { MATERIAL_IMPORTS } from '../../material.imports';
import { MockDataService } from '../../services/mock-data.service';
import { StatCard } from '../../components/stat-card/stat-card';
import { MatIcon } from '@angular/material/icon';
interface DoctorSummary {
  doctorName: string;
  totalPatients: number;
  completedVisits: number;
  avgTime: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, StatCard, BaseChartDirective, MatIcon, ...MATERIAL_IMPORTS],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private dataService = inject(MockDataService);

  // Statistics
  totalPatientsToday = 0;
  completedVisits = 0;
  waitingPatients = 0;
  avgConsultationTime = '0 mins';
  doctorsAvailable = 0;
  doctorsBusy = 0;

  // Chart Data
  public departmentVisitsChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  public departmentVisitsChartOptions: ChartConfiguration['options'] = { responsive: true, maintainAspectRatio: false };

  public doctorVisitsChartData: ChartData<'bar'> = { labels: [], datasets: [{ data: [], label: 'Visits' }] };
  public doctorVisitsChartOptions: ChartConfiguration['options'] = { 
    responsive: true, 
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  // Summary Table
  displayedColumns = ['doctor', 'totalPatients', 'completedVisits', 'avgTime'];
  summaryData: DoctorSummary[] = [];

  ngOnInit() {
    this.generateReport();
  }

  private generateReport() {
    const today = '2024-07-15';
    const allAppointments = this.dataService.getAppointments().filter(a => a.date === today);
    const doctors = this.dataService.getDoctors();

    // Stats
    const uniquePatientIds = new Set(allAppointments.map(a => a.patientId));
    this.totalPatientsToday = uniquePatientIds.size;
    this.completedVisits = allAppointments.filter(a => a.status === 'completed').length;
    this.waitingPatients = allAppointments.filter(a => a.status === 'scheduled').length;

    this.doctorsAvailable = doctors.filter(d => d.isAvailable).length;
    this.doctorsBusy = doctors.length - this.doctorsAvailable;

    // Average Consultation Time Calculation
    let totalMinutes = 0;
    let completedCount = 0;
    
    allAppointments.forEach(app => {
      if (app.status === 'completed' || app.status === 'in-progress') {
        const start = this.timeToMinutes(app.startTime);
        const end = this.timeToMinutes(app.endTime);
        totalMinutes += (end - start);
        completedCount++;
      }
    });

    if (completedCount > 0) {
      this.avgConsultationTime = `${Math.round(totalMinutes / completedCount)} mins`;
    } else {
      this.avgConsultationTime = 'N/A';
    }

    // Charts & Table
    const deptCount = new Map<string, number>();
    const docSummaryMap = new Map<string, DoctorSummary>();

    doctors.forEach(d => {
      docSummaryMap.set(d.id, {
        doctorName: `Dr. ${d.lastName}`,
        totalPatients: 0,
        completedVisits: 0,
        avgTime: '0 mins'
      });
    });

    allAppointments.forEach(app => {
      const doctor = this.dataService.getDoctorById(app.doctorId);
      const dept = doctor ? doctor.specialization : 'Unknown';

      // Dept Chart
      deptCount.set(dept, (deptCount.get(dept) || 0) + 1);

      // Doc Summary
      if (docSummaryMap.has(app.doctorId)) {
        const summary = docSummaryMap.get(app.doctorId)!;
        summary.totalPatients++;
        if (app.status === 'completed') {
          summary.completedVisits++;
        }
      }
    });

    // Populate Pie Chart
    this.departmentVisitsChartData.labels = Array.from(deptCount.keys());
    this.departmentVisitsChartData.datasets[0].data = Array.from(deptCount.values());
    this.departmentVisitsChartData.datasets[0].backgroundColor = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

    // Populate Bar Chart
    this.doctorVisitsChartData.labels = Array.from(docSummaryMap.values()).map(d => d.doctorName);
    this.doctorVisitsChartData.datasets[0].data = Array.from(docSummaryMap.values()).map(d => d.totalPatients);
    this.doctorVisitsChartData.datasets[0].backgroundColor = '#3b82f6';

    // Populate Table Data (Add mock avg times for simplicity)
    this.summaryData = Array.from(docSummaryMap.values()).map(d => {
      // Simple mock calculation for each doctor's average time
      const mockAvg = d.completedVisits > 0 ? (15 + Math.floor(Math.random() * 10)) : 0;
      return {
        ...d,
        avgTime: mockAvg > 0 ? `${mockAvg} mins` : 'N/A'
      };
    });
  }

  private timeToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
