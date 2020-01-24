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
  Image,
  AsyncStorage
} from 'react-native';

export default class Resultado extends Component{

  _detalle = () => {
    this.props.navigation.navigate("Detalle", {
      idLibro: this.props.idLibro
      });
  }

render(){
  return (
    <TouchableOpacity style={styles.contenedor_principal} onPress={this._detalle} >

      <View style={styles.contenedor_libro}>
        <View style={styles.contenedor_libro_descripcion}>
            <Text style={[styles.libro_texto, styles.libro_titulo]}>{this.props.titulo}</Text>
        </View>

        <View style={styles.contenedor_libro_imagen}>
          <Image
            style={{width: 50, height: 50, }}
            source = {require('../image/libro.png')}
          />
        </View>

      </View>
    </TouchableOpacity>
  )};
}


const styles = StyleSheet.create({
  contenedor_principal:{
    // backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black"

  },
  contenedor_libro:{
    alignItems: "center",
    backgroundColor: "#0D3863",
    fontFamily: "Roboto",
    flexDirection: "row"
  },

  contenedor_libro_descripcion:
  {
    height: "100%",
    flex: 4,
    // backgroundColor: "yellow",
    flexDirection: "column"
  },

  contenedor_libro_imagen:
  {
    flex: 1,
    // height: "100%",
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center",
    // backgroundColor: "black"

  },

  libro_texto:{
    color: "#1CBB9B",
    textAlign: "center",
    fontSize: 12
  },

  libro_info:{
    flex: 1,
    // backgroundColor: "red",
    // borderWidth: 1
  },

  libro_titulo:{
    fontSize: 20,
    fontWeight: "bold"


  },

  libro_descripcion:{
    fontStyle: "italic",


  },

  libro_autor:{
    fontStyle: "italic"
  },

  contenedor_libro_fila:{
    // backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  libro_existencias:{
    fontSize: 14
  }
});
