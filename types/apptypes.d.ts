interface Supplier {
  id: number | null;
  name: string;
  address: string | null;
  contact: string | null;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number | null;
  name: string;
  description: string | null;
  image: string | null;
  image_key: string | null;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
