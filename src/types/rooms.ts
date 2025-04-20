export type SeatStatus = "allotted" | "vacant" | "blank";
export interface Seat {
  status: SeatStatus;
  label:string;
  userId?:string;
  userName?: string;
}
export interface Room {
  $id: string;
  name: string;
  layout: Seat[][];
}
