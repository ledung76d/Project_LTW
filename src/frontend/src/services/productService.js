import axios from '../axios'

const handleGetProductByCategory = async (category) => {
  let link = '/api/get-product?category=' + encodeURIComponent(category)
  return axios.get(link)
}

const handleGetCategoryById = async (id) => {
  return axios.get(`/api/get-category-by-id?id=${id}`)
}

const handleGetStoreById = async (id) => {
  return axios.get(`/api/get-store-by-id?id=${id}`)
}

const handleSaveToOrderItem = async (item) => {
  return axios.post('/api/save-to-order-item', item)
}

const handleFindOrderById = async (id) => {
  return axios.get('/api/find-order-by-id?id=' + encodeURIComponent(id))
}

const handleFindProductById = async (id) => {
  return axios.get(`/api/find-product-by-id?id=${id}`)
}

const handleGetProductByStoreId = async (sid)=>{
  return axios.get(`/api/get-product-by-storeId?sid=${sid}`)
}

const deleteProductById = async (pid)=>{
  return axios.post('/api/delete-product-by-pid',{pid: pid})
}

const handleGetAllCategory = async ()=>{
    return axios.get('/api/get-all-category')
}

const handleSearchProductByName = async (name)=>{
  return axios.get(`/api/search-by-name?name=${name}`)
}

export {
  handleGetProductByCategory,
  handleGetCategoryById,
  handleGetStoreById,
  handleSaveToOrderItem,
  handleFindOrderById,
  handleFindProductById,
  handleGetProductByStoreId,
  deleteProductById,
  handleGetAllCategory,
  handleSearchProductByName,
}
