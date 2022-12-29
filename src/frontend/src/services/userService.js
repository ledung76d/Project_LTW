import axios from '../axios'

let handleLogin = (email,passWord)=>{
    return axios.post('/api/login',{
        userName: email,
        passWord:passWord
    })
}


let handleSaveOrder = (order)=>{
    return axios.post('/api/save-order',order)
}

let handleGetOrderByUserId = (cid)=>{
    return axios.get(`/api/find-order-by-userid?id=${cid}`)
}


let handleChangePassWord = (data)=>{
    return axios.post('/api/change-password',data)
}

let cloudinaryUpload = (fileToUpload) => {
    return axios.post('/cloudinary-upload', fileToUpload)
    // .then(res => res.data)
    // .catch(err => console.log(err))
}

let changeFLA = (data)=>{
    return axios.post('/api/change-fla',data)
}


let handleGetUserInfoByCid = (cid)=>{
    return axios.get(`/api/get-userinfo-by-cid?cid=${cid}`)
}

export {handleLogin,handleSaveOrder,handleGetOrderByUserId,handleChangePassWord,cloudinaryUpload,changeFLA,handleGetUserInfoByCid}