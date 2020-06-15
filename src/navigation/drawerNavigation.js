import cart from '../containers/cart';
import favourite from '../containers/favourite';
import { navigationConstants } from './../utils/constants/navigationConstants';
import { stackNavigation } from './stackNavigation';
import SongsListing from '../containers/songsListing';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { stringConstants } from './../utils/constants/stringConstants';

export default drawerNavigation = createDrawerNavigator({
    [navigationConstants.stackNavigation] : {
        screen:stackNavigation,
        navigationOptions:{
            drawerLabel:stringConstants.allSongs
        }
    },
    // [navigationConstants.listing] : {
    //     screen: SongsListing,
    //     navigationOptions:{
    //         drawerLabel:"All Songs"
    //     }
    // },
    [navigationConstants.cart] : {
        screen:cart,
        navigationOptions:{
            drawerLabel:stringConstants.myCart
        }
    },
    [navigationConstants.favourite] : {
        screen:favourite,
        navigationOptions:{
            drawerLabel:stringConstants.myFavourites
        }
    },
    
},{
    initialRouteName:navigationConstants.stackNavigation,
})