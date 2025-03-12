import { TaskStatus } from './taskStatus';

export type Task = {
  id: number;
  name: string;
  dueData: string;
  status: TaskStatus;
  description: string;
};
