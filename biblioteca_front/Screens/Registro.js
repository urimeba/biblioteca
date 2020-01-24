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
  Alert,
  Image
} from 'react-native';

import axios from 'axios';

export default class Login extends Component<props>{

state = {
    user: '',
    password: '',
    password2: '',
    email: '',
    number: '',
}

_registroNuevo =async() => {
  if(this.state.user=="" || this.state.password=="" || this.state.password2=="" || this.state.email=="" || this.state.number==""){
    console.log("Hay un dato vacio");
    Alert.alert("Verifica tus datos", "Favor de ingresar todos los datos requeridos");
  }
  else
  {
    if(this.state.password == this.state.password2){
      // console.log("Las contraseñas son iguales");
      
      axios({
        method: 'POST',
        url: await AsyncStorage.getItem("server") + "registro",
        data: {username:this.state.user, password:this.state.password, email:this.state.email, number:this.state.number},
        headers: {
        "content-type":"application/json",
        },
        }).then( res => {
        console.log(res);
        }).catch(err => {
        console.log(err);
        Alert.alert("Error", "El usuaro ya existe");
        // PREGUNTAR COMO OBTENER EL MENSAJE PRECISO DEL ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        });
    }
    else{
      Alert.alert("Verifica tus datos", "Las contraseñas no coinciden");
    }

  }
  
}

_iniciarSesion = () =>{
  this.props.navigation.navigate("Login");
}

render(){
  return (
    // DIV DEL CONTENEDOR PRINCIPAL
    <View style={styles.contenedor_principal}> 

    {/* DIV DE LA IMAGEN DEL REGISTRO */}
      <View style={styles.div_imagen_registro}> 
        <Image
          style={{width: 200, height: 150, }}
          source = {require('../image/usuario.png')}
        />
      </View>

      {/* DIV DEL TITULO DEL REGISTRO */}
      <View style={styles.div_titulo_aplicacion}>
        <Text style={styles.titulo_aplicacion}>Registro</Text>
      </View>

      {/* DIV DEL SUBTITULO DEL REGISTRO */}
      <View style={styles.div_descripcion_aplicacion}>
        <Text style={styles.descripcion_aplicacion}>¡Accede a todas las funcionalidades!</Text>
      </View>

    {/* DIV DE LOS INPUTS DEL REGISTRO */}
      <View style={styles.div_inputs_registro}>
        <TextInput onChangeText={user => this.setState({user})}  autoCapitalize="none" style={styles.inputs_registro} placeholderTextColor="#5E748A" placeholder={"Ingresa un nombre de usuario"}></TextInput>
        <TextInput onChangeText={password => this.setState({password})} autoCapitalize="none" style={styles.inputs_registro} placeholderTextColor="#5E748A" placeholder={"Ingresa una contraseña"} secureTextEntry></TextInput>
        <TextInput onChangeText={password2 => this.setState({password2})} autoCapitalize="none" style={styles.inputs_registro} placeholderTextColor="#5E748A" placeholder={"Confirma tu contraseña"} secureTextEntry></TextInput>
        <TextInput onChangeText={email => this.setState({email})} autoCapitalize="none" style={styles.inputs_registro} placeholderTextColor="#5E748A" placeholder={"Ingresa tu correo electronico"}></TextInput>
        <TextInput onChangeText={number => this.setState({number})} keyboardType="number-pad" autoCapitalize="none" style={styles.inputs_registro} placeholderTextColor="#5E748A" placeholder={"Ingresa tu numero telefonico"}></TextInput>
      </View>

    {/* DIV DE BOTONES DEL REGISTRO */}
      <View style={styles.div_botones_registro}>
        <TouchableOpacity  style={styles.botones_registro} onPress={this._registroNuevo}>
            <Text style={styles.texto_botones_registro}>¡Registrame!</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.botones_registro} onPress={this._iniciarSesion}>
            <Text style={styles.texto_botones_registro}>Iniciar sesión</Text>
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

  div_imagen_registro:{
    width: 150,
    height: 150,
    marginTop: 30,
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

  div_inputs_registro:
  {
    width: "100%",
    height: "48%",
    // backgroundColor: "red",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"

  },

  inputs_registro:{
    width: "80%",
    borderRadius: 50,
    color: "#5E748A",
    backgroundColor: "#082744",
    textAlign: "center"
  },

  div_botones_registro:{
    width: "100%",
    height: 70,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  botones_registro:{
    width: 120,
    height: 40,
    backgroundColor: "#1BBC9B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },

  texto_botones_registro:
  {
    color: "white",
    fontSize: 16
  },
  });
