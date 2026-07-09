export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  phone: string;
  email: string;
  avatar?: string;
  availableDays: string[];
  workingHours: { start: string; end: string };
  isAvailable: boolean;
}
