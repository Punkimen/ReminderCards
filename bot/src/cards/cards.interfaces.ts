export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

export interface Card {
  id: string;
  value: string;
  translate: string;
  priority: Priority;
  user: number;
}
