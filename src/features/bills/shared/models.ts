export interface Bill {
  id?: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  file?: string | File | null;
  userId: string;
}

export interface BillsByID {
  id: string;
  data: Bill;
}