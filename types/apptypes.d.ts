interface Supplier {
  id: number | null;
  name: string;
  address: string | null;
  contact: string | null;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
