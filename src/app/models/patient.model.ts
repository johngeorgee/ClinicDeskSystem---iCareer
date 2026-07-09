export interface Patient {
  id: string; // Used as National ID
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  phone: string;
  email?: string;
  address?: string;
  bloodType?: string;
  medicalHistory?: string[];
  registeredAt?: string;
  
  // Added for Patients page
  department?: string;
  assignedDoctor?: string;
  status?: string;
}
