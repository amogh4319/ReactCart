import { cartActions } from "./cart"
import { uiActions } from "./uiSlice"
export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const response=await fetch('https://react-http-4aee6-default-rtdb.firebaseio.com/cartData.json')
            if(!response.ok){
                throw new Error('unable to fetch data!!!')
            }
            const data=await response.json();
            return data;
        }
    
    try{
        const cartData=await fetchData();
        dispatch(cartActions.replaceCart(cartData))
    }catch(error){
        dispatch(uiActions.showNotification({
            status:'error',
            title:'error!',
            message:'failed to fetch cart data!!!'
          }))
    }
}
}

export const sendCartData=(cartData)=>{
    return async(dispatch)=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'sending!',
        message:'sending cart data!!!'
      }))
    const makeRequest=async()=>{
      const response=await fetch('https://react-http-4aee6-default-rtdb.firebaseio.com/cartData.json',{
        method:'PUT',
        body:JSON.stringify(cartData)
      })
      if(!response.ok){
        throw new Error('sending cart data is failed!')
      }
    }
    try{
      await makeRequest()
      dispatch(uiActions.showNotification({
        status:'success',
        title:'success!',
        message:'sending cart data successfully!!!'
      }))
    }catch(error){
      dispatch(uiActions.showNotification({
        status:'error',
        title:'error!',
        message:'failed to send cart data!!!'
      }))
    }
    }
  }
  