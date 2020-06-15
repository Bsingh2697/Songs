import { combineReducers } from "redux";
import favouriteReducer from './favouriteReducer';
import cartReducer from './cartReducer';
import appReducer from './cartReducer';


const rootReducer = combineReducers({
    favourite:favouriteReducer,
    cart:cartReducer,
    appReducer:appReducer,
})

export default rootReducer