import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly patients: Patient[] = [
    {
      id: '1001',
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      phone: '+966 50 123 4567',
      email: 'ahmed.rashid@email.com',
      address: '45 King Fahd Road, Riyadh',
      bloodType: 'A+',
      medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
      registeredAt: '2024-01-15',
      department: 'Cardiology',
      assignedDoctor: 'Dr. Sami Al-Harbi',
      status: 'Scheduled'
    },
    {
      id: '1002',
      firstName: 'Fatima',
      lastName: 'Al-Salem',
      dateOfBirth: '1992-07-22',
      gender: 'female',
      phone: '+966 55 234 5678',
      email: 'fatima.salem@email.com',
      address: '12 Olaya Street, Riyadh',
      bloodType: 'O+',
      registeredAt: '2024-02-20',
      department: 'Pediatrics',
      assignedDoctor: 'Dr. Layla Al-Qahtani',
      status: 'Checked-In'
    },
    {
      id: '1003',
      firstName: 'Omar',
      lastName: 'Hassan',
      dateOfBirth: '1978-11-03',
      gender: 'male',
      phone: '+966 54 345 6789',
      email: 'omar.hassan@email.com',
      address: '78 Tahlia Street, Jeddah',
      bloodType: 'B+',
      medicalHistory: ['Asthma'],
      registeredAt: '2024-03-10',
      department: 'Orthopedics',
      assignedDoctor: 'Dr. Youssef Mahmoud',
      status: 'In Consultation'
    },
    {
      id: '1004',
      firstName: 'Nour',
      lastName: 'Ibrahim',
      dateOfBirth: '2000-05-18',
      gender: 'female',
      phone: '+966 56 456 7890',
      email: 'nour.ibrahim@email.com',
      address: '33 Prince Sultan Road, Riyadh',
      bloodType: 'AB+',
      registeredAt: '2024-04-05',
      department: 'Dermatology',
      assignedDoctor: 'Dr. Mona Al-Dosari',
      status: 'Completed'
    },
    {
      id: '1005',
      firstName: 'Khalid',
      lastName: 'Al-Zahrani',
      dateOfBirth: '1965-09-28',
      gender: 'male',
      phone: '+966 59 567 8901',
      email: 'khalid.zahrani@email.com',
      address: '91 Al-Madinah Road, Jeddah',
      bloodType: 'O-',
      medicalHistory: ['Coronary Artery Disease', 'Hyperlipidemia'],
      registeredAt: '2024-01-08',
      department: 'Cardiology',
      assignedDoctor: 'Dr. Sami Al-Harbi',
      status: 'Scheduled'
    },
  ];

  private readonly doctors: Doctor[] = [
    {
      id: 'D-2001',
      firstName: 'Sami',
      lastName: 'Al-Harbi',
      specialization: 'Cardiology',
      phone: '+966 50 111 2222',
      email: 'dr.sami@clinic.com',
      availableDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      workingHours: { start: '08:00', end: '16:00' },
      isAvailable: true,
    },
    {
      id: 'D-2002',
      firstName: 'Layla',
      lastName: 'Al-Qahtani',
      specialization: 'Pediatrics',
      phone: '+966 55 333 4444',
      email: 'dr.layla@clinic.com',
      availableDays: ['Sunday', 'Monday', 'Wednesday', 'Thursday'],
      workingHours: { start: '09:00', end: '17:00' },
      isAvailable: true,
    },
    {
      id: 'D-2003',
      firstName: 'Youssef',
      lastName: 'Mahmoud',
      specialization: 'Orthopedics',
      phone: '+966 54 555 6666',
      email: 'dr.youssef@clinic.com',
      availableDays: ['Sunday', 'Tuesday', 'Thursday'],
      workingHours: { start: '10:00', end: '18:00' },
      isAvailable: false,
    },
    {
      id: 'D-2004',
      firstName: 'Mona',
      lastName: 'Al-Dosari',
      specialization: 'Dermatology',
      phone: '+966 56 777 8888',
      email: 'dr.mona@clinic.com',
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      workingHours: { start: '08:30', end: '15:30' },
      isAvailable: true,
    },
  ];

  private readonly appointments: Appointment[] = [
    {
      id: 'A-3001',
      patientId: 'P-1001',
      doctorId: 'D-2001',
      date: '2024-07-15',
      startTime: '09:00',
      endTime: '09:30',
      status: 'completed',
      type: 'Follow-up',
      notes: 'Blood pressure check — stable',
      createdAt: '2024-07-10',
    },
    {
      id: 'A-3002',
      patientId: 'P-1002',
      doctorId: 'D-2002',
      date: '2024-07-15',
      startTime: '10:00',
      endTime: '10:30',
      status: 'scheduled',
      type: 'Consultation',
      createdAt: '2024-07-12',
    },
    {
      id: 'A-3003',
      patientId: 'P-1003',
      doctorId: 'D-2003',
      date: '2024-07-16',
      startTime: '11:00',
      endTime: '11:45',
      status: 'scheduled',
      type: 'New Visit',
      notes: 'Knee pain assessment',
      createdAt: '2024-07-13',
    },
    {
      id: 'A-3004',
      patientId: 'P-1004',
      doctorId: 'D-2004',
      date: '2024-07-16',
      startTime: '14:00',
      endTime: '14:30',
      status: 'in-progress',
      type: 'Treatment',
      createdAt: '2024-07-14',
    },
    {
      id: 'A-3005',
      patientId: 'P-1005',
      doctorId: 'D-2001',
      date: '2024-07-17',
      startTime: '08:30',
      endTime: '09:15',
      status: 'cancelled',
      type: 'Follow-up',
      notes: 'Patient requested reschedule',
      createdAt: '2024-07-11',
    },
    {
      id: 'A-3006',
      patientId: 'P-1001',
      doctorId: 'D-2002',
      date: '2024-07-17',
      startTime: '15:00',
      endTime: '15:30',
      status: 'scheduled',
      type: 'Vaccination',
      createdAt: '2024-07-15',
    },
  ];

  getPatients(): Patient[] {
    return this.patients;
  }

  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getPatientById(id: string): Patient | undefined {
    if (!id) {
      return undefined;
    }

    const normalizedId = this.normalizePatientId(id);
    return this.patients.find((p) => this.normalizePatientId(p.id) === normalizedId);
  }

  private normalizePatientId(id: string): string {
    return id.replace(/^P-/, '').trim().toLowerCase();
  }

  addPatient(patient: Patient) {
    this.patients.unshift(patient);
  }

  updatePatient(patient: Patient) {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index !== -1) {
      this.patients[index] = patient;
    }
  }

  deletePatient(id: string) {
    const index = this.patients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.patients.splice(index, 1);
    }
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find((d) => d.id === id);
  }

  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.appointments.filter((a) => a.doctorId === doctorId);
  }

  getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter((a) => a.patientId === patientId);
  }

  updateAppointmentStatus(id: string, status: string) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].status = status as any;
    }
  }

  updateAppointmentNotes(id: string, notes: string) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].notes = notes;
    }
  }

  completePatientVisit(patientId: string) {
    // Update Patient Status
    const pIndex = this.patients.findIndex(p => p.id === patientId);
    if (pIndex !== -1) {
      this.patients[pIndex].status = 'Completed';
    }
    
    // Update Appointment Status (for today's appointment)
    const today = '2024-07-15';
    const aIndex = this.appointments.findIndex(a => a.patientId === patientId && a.date === today);
    if (aIndex !== -1) {
      this.appointments[aIndex].status = 'completed';
    }
  }

  private activeRole = this.getStoredRole() ?? 'Receptionist';

  setActiveRole(role: string) {
    this.activeRole = role;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('clinicdesk-active-role', role);
    }
  }

  getActiveRole(): string {
    return this.activeRole;
  }

  private getStoredRole(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem('clinicdesk-active-role');
  }
}
