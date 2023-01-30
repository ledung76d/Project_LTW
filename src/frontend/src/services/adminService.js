import axios from "../axios";
import * as queryString from "query-string";

const adminService = {
  login(userName, passWord) {
    return axios(`/api/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify({
        storeName: userName,
        phone: passWord,
      }),
    });
  },

  handleGetOrderBySid(sid) {
    return axios(`/api/admin/get-order-by-sid?sid=${sid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  handleGetOrderItemBySidAndOrderId(orderId, sid) {
    return axios(`/api/get-order-item-by-sid-orderid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
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
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  handleAddNewProductByStore(data) {
    return axios("/api/add-new-product-by-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(data),
    });
  },

  handleGetNextPid() {
    return axios("/api/get-next-pid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  handleAddProductCategory(data) {
    return axios("/api/add-product-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(data),
    });
  },

  handleUpdateProductByStore(data) {
    return axios("/api/update-product-by-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(data),
    });
  },

  handleSearchByFilter(data) {
    return axios("/api/search-by-filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(data),
    });
  },

  handleTotal30day(sid) {
    return axios(`/api/total30day`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  handleOrder30day(sid) {
    return axios(`/api/handleOrder30day?${sid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  handleTotalRevenue(sid) {
    return axios(`/api/totalrevenue?sid=${sid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default adminService;
