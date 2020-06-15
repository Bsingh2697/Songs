import { actionConstants } from "../../utils/constants/actionConstants";

export const cartActionCreators = {
    saveToCart: (item) => {
        console.log("SET CART")
        console.log(item)
        return {
            type : actionConstants.SET_CART,
            payload : item
        }
    },
    addToCart: (item) => {      
        console.log("Add To Cart Action")
        return {
            type : actionConstants.ADD_TO_CART,
            payload : item
        }
    },
    removeFromCart: (item) => {
        return {
            type : actionConstants.REMOVE_FROM_CART,
            payload : item
        }
    },
}