
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {stackNavigation} from './stackNavigation';
import { navigationConstants } from './../utils/constants/navigationConstants';
import drawerNavigation from './drawerNavigation';

const mainSwitchNavigator = createSwitchNavigator({
    [navigationConstants.drawerNavigation]:{screen : drawerNavigation}
})

export default AppContainer = createAppContainer(mainSwitchNavigator)