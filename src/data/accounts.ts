import { students } from './students';

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const accounts: Account[] = students.map(student => {
  // Generate a mock email from the student's name
  const email = student.name.toLowerCase().replace(/ /g, '.') + '@example.com';
  return {
    id: student.id,
    name: student.name,
    email,
    password: '123456',
  };
}); 