declare type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  rating: number;
  memory: {
    size: string;
    priceFactor: number;
  }[];
  colors: string[];
  category: number;
};

declare type Sort = {
  id: number;
  name: string;
  orderBy: string;
  order: string;
  alias: string;
};

declare type CartItemProps = {
  id: string;
  title: string;
  imageUrl: string;
  category: number;
  color: string;
  colors: string[];
  memory: {
    size: string;
    priceFactor: number;
  };
  price: number;
  quantity: number;
};
