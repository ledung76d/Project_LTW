import axios from "../axios";

let handleGetInfoUser = () => {
  return axios("/api/user/get-info-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

let handleSaveInfoUser = (data) => {
  return axios("/api/user/save-info-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: JSON.stringify(data),
  });
};

let handleSaveOrder = (order) => {
  return axios("/api/save-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: JSON.stringify(order),
  });
};

let handleGetOrderByUserId = (cid) => {
  return axios(`/api/find-order-by-userid?id=${cid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

let cloudinaryUpload = (fileToUpload) => {
  return axios("/cloudinary-upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: JSON.stringify(fileToUpload),
  });
  // .then(res => res.data)
  // .catch(err => console.log(err))
};

let handleGetUserInfoByCid = (cid) => {
  return axios(`/api/get-userinfo-by-cid?cid=${cid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export {
  handleGetInfoUser,
  handleSaveInfoUser,
  handleSaveOrder,
  handleGetOrderByUserId,
  cloudinaryUpload,
  handleGetUserInfoByCid,
};
