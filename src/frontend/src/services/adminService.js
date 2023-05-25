import axios from "../axios";

const adminService = {
  register(storeName, phone) {
    return axios(`/api/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        storeName: storeName,
        phone: phone,
      }),
    });
  },

  handleGetOrderBySid(sid) {
    return axios(`/api/admin/get-order-by-sid?sid=${sid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleGetOrderItemBySidAndOrderId(orderId, sid) {
    return axios(`/api/get-order-item-by-sid-orderid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        orderId: orderId,
        sid: sid,
      },
    });
  },

  handleChangeOrderStatus(orderId, status) {
    return axios("/api/change-order-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        orderId: orderId,
        status: status,
      }),
    });
  },

  handleGetProductBySid(sid) {
    return axios(`/api/get-product-by-sid?sid=${sid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleAddNewProductByStore(data) {
    // console.log("Test add: ", data);
    return axios("/api/add-new-product-by-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    });
  },

  handleGetNextPid() {
    return axios("/api/get-next-pid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleAddProductCategory(data) {
    return axios("/api/add-product-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    });
  },

  handleUpdateProductByStore(data) {
    return axios("/api/update-product-by-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    });
  },

  handleSearchByFilter(data) {
    return axios("/api/search-by-filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    });
  },

  handleTotal30day() {
    return axios(`/api/total30day`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleOrder30day() {
    return axios(`/api/handleOrder30day`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleTotalRevenue() {
    return axios(`/api/totalrevenue`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handlePopularProduct() {
    return axios(`/api/admin/product-popular`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  handleUpdateStoreInfo(data) {
    // console.log("update store", JSON.stringify(data));
    return axios(`/api/update-store-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    });
  },

  handleGetAnalysisStore() {
    return axios(`/api/admin/analysis-line-chart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default adminService;
