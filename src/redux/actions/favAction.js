import { actionConstants } from "../../utils/constants/actionConstants";

export const favActionCreators = {
    saveToFav: (item) => {
        console.log("SET FAV")
        return {
            type : actionConstants.SET_FAV,
            payload : item
        }
    },
    addToFav: (item) => {
        console.log("Add To Cart Action")
        return {
            type : actionConstants.ADD_TO_FAVOURITE,
            payload : item
        }
    },
    removeFromFav: (item) => {
        return {
            type : actionConstants.REMOVE_FROM_FAVOURITE,
            payload : item
        }
    },
}