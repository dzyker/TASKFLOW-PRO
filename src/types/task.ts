export type Crypto = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: Crypto;
  date: Date;
  title: string;
  status: string;
  priority: number;
  description: string;
}