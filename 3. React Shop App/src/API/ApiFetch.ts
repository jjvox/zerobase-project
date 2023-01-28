import axios from "axios";

export interface ProductsListType {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export const productFetch = async () => {
  const result = await axios.get<ProductsListType[]>(
    `https://fakestoreapi.com/products`
  );

  return result.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: Math.ceil(item.price),
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        count: item.rating.count,
        rate: item.rating.rate,
      },
    };
  });
};
