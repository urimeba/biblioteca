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
  Image,
  AsyncStorage,
  ScrollView
} from 'react-native';

import axios from 'axios';
import Resultado from '../Components/Resultados';

export default class Buscador extends Component<props>{

state = {
    clave: '',
    resultado: []
}

_buscar = async(clave) => {
  console.log(clave)
  this.state.clave=clave;
  this.forceUpdate();

  axios({
    method: 'POST',
    url: await AsyncStorage.getItem("server")+"libros/search_libros/",
    data: {cadena:this.state.clave},
    headers: {
      "content-type":"application/json",
      "Authorization": "Token "+await AsyncStorage.getItem("userToken")
    },
    }).then( res =>
    {
      console.log(res.data)
      this.setState({resultado: res.data.results});
    }).catch(err => {
      console.log("Error");
      console.log(err);
    });
}

render(){

  let res = this.state.resultado.map((componente, key) => {
    return(
    <Resultado
      key = {key}
      navigation={this.props.navigation}
      titulo={componente.titulo}
      idLibro={componente.id}
      >
    </Resultado>)
  });

  return (
    <View style={styles.contenedor_principal}>

      {/* DIV DE LA IMAGEN DE LA APLICACIO */}
      <View style={styles.div_imagen_buscador}>
        <Image
          style={{width: 150, height: 150, }}
          source = {require('../image/lupa.png')}
        />
      </View>

      {/* DIV DEL TITULO DE LA APLICACION */}
      <View style={styles.div_titulo_buscador}>
        <Text style={styles.titulo_buscador}>Buscador</Text>
      </View>

      {/* DIV DEL SUBTITULO DE LA APLICACION */}
      <View style={styles.div_descripcion_buscador}>
        <Text style={styles.descripcion_buscador}>Ingresa una palabra para buscar libros, secciones o mesas</Text>
      </View>

      {/* DIV DE LOS INPUTS */}
      <View style={styles.div_inputs_buscador}>
        <TextInput onChangeText={this._buscar} autoCapitalize="none" placeholderTextColor="#5E748A" style={styles.inputs_buscador} placeholder={"Busca algo..."} ></TextInput>
      </View>

      <ScrollView style={styles.contenedor_resultados}>
        {this.state.clave!='' ? res : <Text style={styles.texto_resultado}>Aqui se mostrarán tus resultados...</Text>}
      </ScrollView>

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

  div_imagen_buscador:{
    width: 150,
    height: 150,
    marginTop: 50,
    // backgroundColor: "green",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },

  div_titulo_buscador:
  {
    width: "100%",
    height: 40,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"

  },

  titulo_buscador:{
    color: "#1CBB9B",
    fontSize: 30,
    // fontStyle: "italic",
  },

  div_descripcion_buscador:{
    width: "100%",
    height: 35,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },

  descripcion_buscador:{
    color: "#1CBB9B",
    fontSize: 15,
    textAlign: "center"
  },

  div_inputs_buscador:{
    width: "100%",
    height: 100,
    // backgroundColor: "red",
    justifyContent: "space-around",
    alignItems: "center"

  },

  inputs_buscador:{
    width: "80%",
    borderRadius: 50,
    color: "#5E748A",
    backgroundColor: "#082744",
    textAlign: "center"
  },

  div_botones_buscador:{
    width: "100%",
    height: 80,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  botones_buscador: {
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
  },

  contenedor_resultados:{
    width: '100%',
    height: '15%',

  },

  texto_resultado:{
    color: "#1CBB9B",
    textAlign: 'center'
  }

});
