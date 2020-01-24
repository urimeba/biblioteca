import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';
import Buscador from '../Screens/Buscador';
import Usuario from '../Screens/Usuario';
import Resultado from '../Components/Resultados';

import Icon from 'react-native-vector-icons/FontAwesome';

const MainNavigator = createBottomTabNavigator(
    {
        Buscador: {
            screen:Buscador,
            navigationOptions:{
                tabBarIcon:({ tintColor }) => {
                    return (
                        <Icon name="search" size={30} color="#900" />
                    // <Image
                    // style = {{width:20, height:20}}
                    // source = {require('../image/lupa.png')}
                    // />
                    )
                },
                tabBarLabel: 'Buscador'
            }
        },
        
        Resultado: {
            screen:Resultado,
            navigationOptions:{
                tabBarIcon:({ tintColor }) => {
                    return (
                        <Icon name="group" size={30} color="#900" />
                    // <Image
                    // style = {{width:20, height:20}}
                    // source = {require('../image/menu.png')}
                    // />
                    )
                },
                tabBarLabel: 'Resultado'
            }
        },

        Usuario: {
            screen:Usuario,
            navigationOptions:{
                tabBarIcon:({ tintColor }) => {
                    return (
                        <Icon name="user-o" size={30} color="#900" />
                    // <Image
                    // style = {{width:20, height:20}}
                    // source = {require('../image/usuario.png')}
                    // />
                    )
                },
                tabBarLabel: 'Usuario'
            }
        },

    },
        {
                initialRouteName: 'Buscador',
                animationEnabled: true,
                tabBarOptions:{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
                labelStyle:{
                    fontSize:13
                },
                tabStyle:{
                    width: 100
                },
                style:{
                    backgroundColor: 'white'
                }
            }
        }
);

export default MainNavigator;