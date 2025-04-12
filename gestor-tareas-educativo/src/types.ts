export interface Task {
    id: string;
    title: string;
    description: string;
    subject: string;
    deadline: string;
    completed: boolean;
    completedAt?: string;
  }