export type Crypto = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: Crypto;
  date: Date;
  text: string;
  status: string;
  priority: number;
}