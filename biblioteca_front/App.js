import React, {Component} from 'react';
import Login from './Screens/Login';
import Registro from './Screens/Registro';
import Buscador from './Screens/Buscador';
import Usuario from './Screens/Usuario';
import SwitchNavigation from './Navigation/SwitchNavigation'

import {AsyncStorage, StatusBar, Platform, View} from 'react-native';

export default class App extends Component<props>{

  componentDidMount = () => {
    this._initdata();
 }

_initdata = async() =>{
  AsyncStorage.setItem("server", "http://148.220.210.228:8000/")
  AsyncStorage.getItem("server").then((obj)=>{
    this.state.server = obj
    this.forceUpdate();
  })
}

state = {server: AsyncStorage.getItem("server")}

  render()
  {
    return(
      <View style={{flex:1}}>
        <StatusBar
        backgroundColor={Platform.OS == 'android' ? "black" : "white"}
        barStyle="light-content"
        />

      <SwitchNavigation></SwitchNavigation>
      </View>
    
      
    );
  }
}
