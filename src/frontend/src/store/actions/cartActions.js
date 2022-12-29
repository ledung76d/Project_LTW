import actionTypes from './actionTypes';
 
/*GET NUMBER CART*/
export const GetNumberCart = ()=>{ 
    return{
        type: actionTypes.GET_NUMBER_CART
    }
}
 
export  const AddCart = (payload)=>{
    return {
        type:   actionTypes.ADD_CART,
        payload
    }
}
export  const UpdateCart = (payload)=>{
    return {
        type: actionTypes.UPDATE_CART,
        payload
    }
}
export  const DeleteCart = ()=>{
    return{
        type: actionTypes.DELETE_CART,
    }
}
 
export  const IncreaseQuantity = (payload)=>{
    return{
        type: actionTypes.INCREASE_QUANTITY,
        payload
    }
}
export  const DecreaseQuantity = (payload)=>{
    return{
        type: actionTypes.DECREASE_QUANTITY,
        payload
    }
}

export const DeleteItem = (payload)=>{
    return {
        type: actionTypes.DELETE_ITEM,
        payload
    }
}

