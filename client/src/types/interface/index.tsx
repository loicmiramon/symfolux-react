// Interface Product (component Catalogpage)
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

// Interface Category  (component Catalogpage)
export interface categoryInterface {
  id: number;
  name: string;
  activation: boolean;
}

// Interface Image (component Productpage)
export interface imageInterface {
  id: number;
  src: string;
  alt: string;
  title: string;
  product_id: number;
}

// Interface Register (component Registerpage)
export interface registerInterface {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  password: string;
}


// Interface Login (component Authentificationpage)
export interface loginInterface {
  email: string;
  password: string;
}


// Interface Auth Context
export interface AuthContextData {
  isUserConnected: boolean;
  user: User | null;
  loginUser: (email: string, password: string) => void;
  detectUser: () => void;
  registerUser: (email: string, password: string, lastname: string, firstname: string) => void;
  logout : () => void;
}

export interface User {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  role: string;
}

// Interface Category Context
export interface CategoryContextData {
  categories: categoryInterface[] | undefined;
  getCategories: () => void;
}

// Interface Product Context
export interface ProductContextData {
  products: productInterface[] | undefined;
  getAllProducts: () => void;
  product: productInterface[] | undefined;
  getProduct: (slug: string | undefined) => void;
}

