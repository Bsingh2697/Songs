import { actionConstants } from "../../utils/constants/actionConstants"
import AsyncStorage from '@react-native-community/async-storage';
import { appConstants } from './../../utils/constants/appConstants';

const initialState = {
    cart : []
}

const reducer = (state = initialState, action) => {
    // console.log("Inside Reducer")
    // console.log(action.type === actionConstants.ADD_TO_CART ? "True" : "False")
    // console.log(action.payload)
    switch(action.type){
        case actionConstants.SET_CART :
            AsyncStorage.setItem(appConstants.cartItems,action.payload)
            let val = action.payload
            if (val == null) val = []
            return { 
                ...state,
                cart:val
            }
        case actionConstants.ADD_TO_CART :
            AsyncStorage.setItem(appConstants.cartItems,JSON.stringify([...state.cart,action.payload]))
            // console.log(AsyncStorage.getItem("cartItems"))
            console.log("ADDDDDDDDDDDDDDDDDDDDDDDDDD")
            return { 
                ...state,
                cart:[...state.cart,action.payload]
            }
        case actionConstants.REMOVE_FROM_CART : 
            AsyncStorage.setItem(appConstants.cartItems,JSON.stringify(state.cart.filter(item=>{return item.id !== action.payload.id})))
            return {
                ...state,
                cart: state.cart.filter(item=>{return item.id !== action.payload.id})
            }
        default : return state
    }
}

export default reducer
