
import { actionConstants } from './../../utils/constants/actionConstants';
import AsyncStorage from '@react-native-community/async-storage';
import { appConstants } from './../../utils/constants/appConstants';

const initialState = {
    favourite : []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionConstants.SET_FAV :
            AsyncStorage.setItem(appConstants.favItems,action.payload)
            let val = action.payload
            if (val == null) val =[]
            return {
                ...state,
                favourite:val
            }
        case actionConstants.ADD_TO_FAVOURITE :
            AsyncStorage.setItem(appConstants.favItems,JSON.stringify([...state.favourite, action.payload]))
            return {
                ...state,
                favourite:[...state.favourite, action.payload]
            }
        case actionConstants.REMOVE_FROM_FAVOURITE :
            AsyncStorage.setItem(appConstants.favItems,JSON.stringify(state.favourite.filter(item=> {return item.id !== action.payload.id})))
            return {
                ...state,
                favourite: state.favourite.filter(item=> {return item.id !== action.payload.id})
            }
        default : return state
    }
}

export default reducer
