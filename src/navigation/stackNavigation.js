
import {createStackNavigator} from 'react-navigation-stack'
import {navigationConstants} from './../utils/constants/navigationConstants';
import SongsListing from '../containers/songsListing';
import cart from '../containers/cart';
import favourite from '../containers/favourite';
import albumDetails  from './../containers/albumDetails';
import artistDetails from './../containers/artistDetails';

export const stackNavigation = createStackNavigator({
    [navigationConstants.listing] : {
        screen: SongsListing
    },
    [navigationConstants.cart] : {
        screen:cart
    },
    [navigationConstants.favourite] : {
        screen:favourite
    },
    [navigationConstants.albumDetails] : {
        screen:albumDetails
    },
    [navigationConstants.artistDetails] : {
        screen:artistDetails
    }
},
{
    initialRouteName : navigationConstants.listing,
    headerMode: 'none',
}
)