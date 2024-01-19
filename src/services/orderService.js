import { request } from "./request";

export const orderService = {
  get: () => request({ method: "get", url: "orders" }),
  getById: (id) => request({ method: "get", url: `orders/${id}` }),
  post: (data) => request({ method: "post", url: "orders", data }),
  delete: (id) => request({ method: "delete", url: `orders/${id}` }),
  put: (data, id) => request({ method: "put", url: `orders/${id}`, data }),
};
