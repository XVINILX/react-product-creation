import { ListProducts, Product } from "domain/entities/Products";
import { callForApiClient } from "./apiClient";

export const getProducts = async (
  page: number,
  search: string
): Promise<ListProducts> => {
  let params = {};

  if (page > 1) {
    params = { page };
  }

  const response = await callForApiClient.jsonService.get("/products/", params);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await callForApiClient.jsonService.get(
    `/products/?id=${id}`
  );
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await callForApiClient.jsonService.post(
    "/products/",
    product
  );
  return response.data;
};

export const updateProduct = async (
  product: Partial<Product>,
  id: number
): Promise<Product> => {
  const response = await callForApiClient.jsonService.put(
    `/products/${id}`,
    product
  );
  return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await callForApiClient.jsonService.delete(`/products/${id}`);
  return response.data;
};
