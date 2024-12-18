export interface Bill {
  id?: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  urlBill?: string;
  userId: string
}

export interface BillsByID {
  id: string;
  data: Bill;
}