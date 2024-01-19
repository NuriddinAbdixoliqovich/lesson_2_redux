import { request } from "./request";

export const productService = {
  get: () => request({ method: "get", url: "products" }),
  getById: (id) => request({ method: "get", url: `products/${id}` }),
  post: (data) => request({ method: "post", url: "products", data }),
  delete: (id) => request({ method: "delete", url: `products/${id}` }),
  put: (data, id) => request({ method: "put", url: `products/${id}`, data }),
};
