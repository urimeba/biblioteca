import Detalle from '../Components/Detalle';
import MainNavigator from '../Navigation/MainNavigator';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator({
        MainNavigator: MainNavigator,
        Detalle: Detalle,
    },

    {
        headerMode: "none",
        
    });