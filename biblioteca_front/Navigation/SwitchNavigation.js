import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import Registro from '../Screens/Registro';
import Buscador from '../Screens/Buscador';
import Usuario from '../Screens/Usuario';
import MainNavigator from '../Navigation/MainNavigator';
import AuthLoadingScreen from '../Screens/AuthLoadingScreen';
import Resultado from '../Components/Resultados';
import Detalle from '../Components/Detalle';

const SwitchNavigation = createSwitchNavigator(
    {
        App: MainNavigator,
        Login: Login,
        Loading: AuthLoadingScreen,
        Registro:Registro,
        Usuario:Usuario,
        Buscador:Buscador,
        Resultado:Resultado,
        Detalle: Detalle,
    },

    {
        initialRouteName: 'Loading'
    }
);

export default createAppContainer(SwitchNavigation);
