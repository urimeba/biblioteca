/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Alert
} from 'react-native';

import axios from 'axios';

export default class Login extends Component<props>{
state = {
    user: '',
    password: '',
}

_login = async() => {
  if(this.state.user=='' || this.state.password==''){
    // console.log('NO HAY NADA EN USUARIO Y CONTRASEÑA');
    Alert.alert("Verifica tus datos", "Favor de ingresar el usuario y la contraseña");
  }
  else{
    // const server =  AsyncStorage.getItem('server');
    console.log(this.state.user, this.state.password, await AsyncStorage.getItem("server"));

    axios({
      method: 'POST',
      url: await AsyncStorage.getItem("server")+'api-login',
      data: {username:this.state.user, password:this.state.password},
      headers: {
        "content-type":"application/json",
      },

      }).then( res => 
        {
        AsyncStorage.setItem("userToken",res.data.token);
        AsyncStorage.setItem("userId",res.data.id);
        
        // console.log(res.data.token);
        // console.log("ID");
        // console.log(res.data.id);
        this.props.navigation.navigate("App");
      }).catch(err => {
        console.log("Error");
        console.log(err);
        Alert.alert("Datos incorrectos", "Verifica los datos ingresados");
      });
  }
}

_registro = () =>
{
  this.props.navigation.navigate("Registro");
}

render(){
  return (
    <View style={styles.contenedor_principal}> 

    {/* DIV DE LA IMAGEN DE LA APLICACIO */}
      <View style={styles.div_imagen_perfil}> 
        <Image
          style={{width: 150, height: 150, }}
          source = {require('../image/libros.jpg')}
        />
      </View>

      {/* DIV DEL TITULO DE LA APLICACION */}
      <View style={styles.div_titulo_aplicacion}>
        <Text style={styles.titulo_aplicacion}>Biblioteca "Betas"</Text>
      </View>

      {/* DIV DEL SUBTITULO DE LA APLICACION */}
      <View style={styles.div_descripcion_aplicacion}>
        <Text style={styles.descripcion_aplicacion}>Proyecto de practica</Text>
      </View>

      {/* DIV DE LOS INPUTS */}
      <View style={styles.div_inputs_aplicacion}>
        <TextInput onChangeText={user => this.setState({user})} autoCapitalize="none" placeholderTextColor="#5E748A" style={styles.inputs_aplicacion} placeholder={"Usuario"} ></TextInput>
        <TextInput onChangeText={password=> this.setState({password})} placeholderTextColor="#5E748A" style={styles.inputs_aplicacion} placeholder={"Contraseña"} secureTextEntry></TextInput>
      </View>

      {/* DIV DE LOS BOTONES */}
      <View style={styles.div_botones_aplicacion}>
        <TouchableOpacity  style={styles.botones_aplicacion} onPress={this._registro}>
            <Text style={styles.texto_botones}>Registro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botones_aplicacion} onPress={this._login}>
          <Text style={styles.texto_botones}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  )};
}

const styles = StyleSheet.create({
    contenedor_principal:{
      flex: 1,
      alignItems: "center",
      backgroundColor: "#0D3863",
      fontFamily: "Roboto"
    },

    div_imagen_perfil:{
      width: 150,
      height: 150,
      marginTop: 50,
      backgroundColor: "green",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },

    div_titulo_aplicacion:
    {
      width: "100%",
      height: 40,
      // backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"

    },

    titulo_aplicacion:{
      color: "#1CBB9B",
      fontSize: 30,
      // fontStyle: "italic",
    },

    div_descripcion_aplicacion:{
      width: "100%",
      height: 25,
      // backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    },

    descripcion_aplicacion:{
      color: "#1CBB9B",
      fontSize: 15,
    },

    div_inputs_aplicacion:{
      width: "100%",
      height: 180,
      // backgroundColor: "red",
      justifyContent: "space-around",
      alignItems: "center"

    },

    inputs_aplicacion:{
      width: "80%",
      borderRadius: 50,
      color: "#5E748A",
      backgroundColor: "#082744",
      textAlign: "center"
    },

    div_botones_aplicacion:{
      width: "100%",
      height: 80,
      // backgroundColor: "red",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },

    botones_aplicacion: {
      width: 120,
      height: 40,
      backgroundColor: "#1BBC9B",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center"
    },

    texto_botones:{
      color: "white",
      fontSize: 16
    }
  });
