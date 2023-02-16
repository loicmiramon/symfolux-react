// Interface Product
export interface productInterface {
  id: number;
  title: string;
  price: number;
  reduction: number;
  description: string;
  category_id: number;
  references_product: string;
  activation: boolean;
  slug: string;
  images: string;
}

// Interface Category
export interface categoryInterface {
  id: number;
  name: string;
  activation: boolean;
}

// Interface Image
export interface imageInterface {
  id: number;
  src: string;
  alt: string;
  title: string;
  product_id: number;
}

// Interface Register
export interface registerInterface {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  password: string;
}

// Interface Login
export interface loginInterface {
  email: string;
  password: string;
}

// Interface User Context
export interface userContextInterface {

}
