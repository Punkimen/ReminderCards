export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export interface ICard {
  id: string;
  value: string;
  translate: string;
  priority: Priority;
}
