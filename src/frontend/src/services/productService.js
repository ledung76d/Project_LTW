import axios from "../axios";

const handleGetProductByCategory = async (category) => {
  let link = `/api/get-product?category=${encodeURIComponent(category)}`;
  return axios.get(link);
};

const handleGetCategoryById = async (id) => {
  return axios.get(`/api/get-category-by-id?id=${id}`);
};

const handleGetStoreById = async (id) => {
  return axios.get(`/api/get-store-by-id?id=${id}`);
};

const handleSaveToOrderItem = async (item) => {
  return axios("/api/save-to-order-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: JSON.stringify(item),
  });
};

const handleFindOrderById = async (id) => {
  return axios(`/api/find-order-by-id?id=${encodeURIComponent(id)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const handleFindProductById = async (id) => {
  return axios.get(`/api/find-product-by-id?id=${id}`);
};

const handleGetProductByStoreId = async (sid) => {
  return axios.get(`/api/get-product-by-storeId?sid=${sid}`);
};

const deleteProductById = async (pid) => {
  return axios(`/api/delete-product-by-pid?pid=${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const restoreProductById = async (pid) => {
  return axios(`/api/restore-product-by-pid?pid=${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const handleGetAllCategory = async () => {
  return axios.get("/api/get-all-category");
};

const handleSearchProductByName = async (name) => {
  return axios.get(`/api/search-by-name?name=${name}`);
};

export {
  handleGetProductByCategory,
  handleGetCategoryById,
  handleGetStoreById,
  handleSaveToOrderItem,
  handleFindOrderById,
  handleFindProductById,
  handleGetProductByStoreId,
  deleteProductById,
  restoreProductById,
  handleGetAllCategory,
  handleSearchProductByName,
};
