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
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';

import axios from 'axios';

// PREGUNTAR SI ESTA BIEN HACERLO DESDE EL DIDMOUNT O ES MEJOR USAR EL CONSTRUCTOR
export default class Usuario extends Component<props>{
  componentDidMount = () => {
    
    this._obtenerDatos();
}    

state = {
  nombreUsuario: '',
  nombre: '',
  apellido: '',
  correo: ''
}

_obtenerDatos = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const id = await AsyncStorage.getItem('userId');
    const server = await AsyncStorage.getItem("server");

    // console.log(server+'users/'+id+'/');

    axios({
      method: 'GET',
      url: server+'users/'+id+'/',
      data: {},
      headers: {
        "content-type":"application/json",
        "Authorization": "Token "+token
      },
    }).then( res => {
      // console.log("Datos del usuario");
      // console.log(res.data);
      this.setState({nombreUsuario:res.data.username});
      this.setState({correo:res.data.email});
      this.setState({nombre:res.data.first_name});
      this.setState({apellido:res.data.last_name});
    }).catch(err => {
      console.log(err);
    });
  }
  catch (error) {
    // Error retrieving data
    console.log(error);
  }
};


_cerrarSesion = () =>{
  AsyncStorage.removeItem("userToken");
  this.props.navigation.navigate("Loading");
  console.log("Se presiono el boton de cerrar sesion");
}

render(){
  return (
    <View style={styles.contenedor_principal}> 
    
      {/* DIV DE LA IMAGEN DEL USUARIO */}
      <View style={styles.div_imagen_usuario}> 
      <Image
          style={{width: 200, height: 150, }}
          source = {require('../image/usuario.png')}
        />
      </View>

      {/* DIV DEL TITULO DE DATOS PERSONALES */}
      <View style={styles.div_titulo_usuario}>
        <Text style={styles.titulo_usuario}>Datos personales</Text>
      </View>

      {/* DIV DE LOS DATOS PROPIOS DEL USUARIO */}
      <View style={styles.div_descripcion_usuario}>
        <Text style={styles.titulo_descripcion_usuario}>Usuario:</Text> 
        <Text style={styles.descripcion_usuario}>{this.state.nombreUsuario}</Text>
        <Text style={styles.titulo_descripcion_usuario}>Nombre:</Text> 
        <Text style={styles.descripcion_usuario}>{this.state.nombre}</Text>
        <Text style={styles.titulo_descripcion_usuario}>Apellidos(s):</Text> 
        <Text style={styles.descripcion_usuario}>{this.state.apellido}</Text> 
        <Text style={styles.titulo_descripcion_usuario}>Correo electrónico:</Text> 
        <Text style={styles.descripcion_usuario}>{this.state.correo}</Text> 
        <Text style={styles.titulo_descripcion_usuario}>Numero telefónico:</Text> 
        <Text style={styles.descripcion_usuario}>XXXXXXXXX</Text> 
      </View>

      {/* DIV DEL BOTON DE CERRAR SESION */}
      <View style={styles.div_botones_usuario}>
        <TouchableOpacity style={styles.botones_usuario} onPress={this._cerrarSesion}>
          <Text style={styles.texto_botones}>Cerrar sesión</Text>
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

    div_imagen_usuario:{
      width: 150,
      height: 150,
      marginTop: 50,
      backgroundColor: "green",
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },

    div_titulo_usuario:
    {
      width: "100%",
      height: 40,
      // backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"

    },

    titulo_usuario:{
      color: "#1CBB9B",
      fontSize: 30,
      // fontStyle: "italic",
    },

    div_descripcion_usuario:{
      width: "100%",
      // backgroundColor: "black",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "45%"
    },

    titulo_descripcion_usuario:{
      color: "#1CBB9B",
      fontSize: 20,
    },

    descripcion_usuario:{
      color: "#1CBB9B",
      fontSize: 18,
    },

    div_botones_usuario:{
      width: "100%",
      height: 80,
      // backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    },

    botones_usuario:{
      width: 150,
      height: 50,
      backgroundColor: "#1BBC9B",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },

    texto_botones:{
      color: "white",
      fontSize: 20
    }

  });
