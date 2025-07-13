export interface ProductInterface {
  _id?: string;
  name: string;
  description: string;
  price: number;
  shortDescription: string;
  discount: number;
  images: string[];
  categoryId: string;
  brandId: string;
  isFeatured: boolean;
  isNewArrival: boolean;
}
