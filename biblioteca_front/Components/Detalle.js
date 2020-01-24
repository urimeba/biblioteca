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
  Image,
  AsyncStorage,
  TouchableOpacity,
  Alert
} from 'react-native';

import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

//


export default class Detalle extends Component{

  state = {
      id: '', 
      titulo: '',
      autor: '',
      isbn: '',
      fecha: '',
      paginas: '',
      editorial: '',
      existencias: '',
      seccion: '',

      solicitud: '1',
      status: '0'
  }

  

  componentDidMount(){
    const {navigation} = this.props;
    idLibro = navigation.state.params.idLibro;
    this._getLibro(idLibro);
    }

    

    _getLibro = async(idLibro) => {
      axios({
        method: 'GET',
        url: await AsyncStorage.getItem("server")+'libros/'+idLibro+'/',
        data: {},
        headers: {
          "content-type":"application/json",
          "Authorization": "Token "+await AsyncStorage.getItem("userToken")
        },
      
        }).then( res =>
          {
          // console.log(res.data);
          this.setState({id:res.data.id});
          this.setState({titulo:res.data.titulo});
          this.setState({autor:res.data.autor});
          this.setState({isbn:res.data.isbn});
          this.setState({fecha:res.data.fecha});
          this.setState({paginas:res.data.paginas});
          this.setState({editorial:res.data.editorial});
          this.setState({existencias:res.data.existencias});
          this.setState({seccion:res.data.seccion});
          this.forceUpdate();
        }).catch(err => {
          console.log("Error al obtener el libro");
          console.log(err);
        });


        axios({
          method: 'POST',
          url:  await AsyncStorage.getItem("server")+'solicitudes/search_solicitudes/',
          data: {usuario: await AsyncStorage.getItem("userId"), libro: idLibro },
          headers: {
            "content-type":"application/json",
            "Authorization": "Token "+await AsyncStorage.getItem("userToken")
          },
        
          }).then( res =>
            {
            // console.log(res.data);
            if(res.data.count>0){
              // console.log("El usuario ya tiene una solicitud en este libro");
              // console.log(res.data.results[0].status);
              this.setState({status: res.data.results[0].status});
            }
            else{
              // console.log("El usuario no ha solicitado este libro");
              this.setState({solicitud:'0'});
              this.forceUpdate();
            }
          }).catch(err => {
            console.log("Error al obtener la solicitud");
            console.log(err);
          });





    }

    _reservar = async() =>{
      console.log("hey");

      let servidor = await AsyncStorage.getItem("server");
      let idUsuario = await AsyncStorage.getItem("userId");

      let urlUser = servidor+'usuarios/'+idUsuario+"/";
      let urlLibro = servidor+"libros/"+ await this.state.id+"/";

      console.log(urlUser)

      axios({
        method: 'POST',
        url:  servidor+'solicitudes/',
        data: {usuario: urlUser, libro: urlLibro,  activo:1 },
        headers: {
          "content-type":"application/json",
          "Authorization": "Token "+ await AsyncStorage.getItem("userToken")
        },
      
        }).then( res =>
          {
          console.log(res.data);
          this.setState({solicitud: 1});
          this.forceUpdate();
        }).catch(err => {
          console.log("Error");
          console.log(err);
        });

    }

    


render(){
  const existencias = <View style={styles.contenedor_regresar_imagen}>
        <TouchableOpacity  style={styles.boton_regresar} onPress={this._reservar}>
          <Text style={[styles.libro_texto]}>RESERVAR 1</Text>
          <Icon name="book" size={30} color="#900" />
        </TouchableOpacity>
      </View>;

    const sinExistencias = <View style={styles.contenedor_regresar_imagen}>
    <TouchableOpacity  style={styles.boton_regresar}>
      <Text style={[styles.libro_texto]}>LO SENTIMOS! No quedan libros o ya lo has solicitado</Text>
      <Icon name="book" size={30} color="#900" />
    </TouchableOpacity>
    </View>;

    const enProceso = <View style={styles.contenedor_regresar_imagen}>
    <TouchableOpacity  style={styles.boton_regresar}>
      <Text style={[styles.libro_texto]}>Ya has pedido este libro. Tu solicitud esta siendo aprobada</Text>
      <Icon name="book" size={30} color="#900" />
    </TouchableOpacity>
    </View>;


  return (
    <View style={styles.contenedor_principal} >

      <View style={styles.contenedor_libro}>
      
        <View style={styles.contenedor_libro_descripcion}>
        <Text style={[styles.libro_texto, styles.libro_titulo]}>Detalle del libro</Text>
            <Text style={[styles.libro_texto, styles.libro_titulo]}>{this.state.titulo}</Text>
            {/* <Text style={[styles.libro_texto, styles.libro_descripcion]}>Descripcion del libro asjdajsdja jad asjd as aj sdjas j</Text> */}

            <View style={styles.contenedor_libro_fila}>
              <Text style={[styles.libro_texto, styles.libro_info]}>{this.state.paginas} paginas</Text>
              <Text style={[styles.libro_texto, styles.libro_info]}>Sección: Drama</Text>
            </View>

            <View style={styles.contenedor_libro_fila}>
              <Text style={[styles.libro_texto, styles.libro_info, styles.libro_autor]}>Por: {this.state.autor}</Text>
              <Text style={[styles.libro_texto, styles.libro_info]}>ISBN: {this.state.isbn}</Text>
            </View>

            <View style={styles.contenedor_libro_fila}>
              <Text style={[styles.libro_texto, styles.libro_info]}>Fecha: {this.state.fecha}</Text>
              <Text style={[styles.libro_texto, styles.libro_info]}>Editorial: {this.state.editorial}</Text>
            </View>

        </View>

        <View style={styles.contenedor_libro_imagen}>
          <Image
            style={{width: 50, height: 50, }}
            source = {require('../image/libro.png')}
          />

          <View style={styles.contenedor_libro_fila}>
              <Text style={[styles.libro_texto, styles.libro_info, styles.libro_existencias]}>Existentes: {this.state.existencias}</Text>
            </View>
        </View>
      </View>

      

      {/* COMO VOLVER A REALIZAR ESTE IF AL MOMENTO DE TERMINAR EL AJAX */}
      {this.state.existencias > 0  && this.state.solicitud=='0' ? existencias : sinExistencias}

      
    
      <View style={styles.contenedor_regresar_imagen}>
        <TouchableOpacity  style={styles.boton_regresar} onPress={() => goBack(null)} >
          <Text style={[styles.libro_texto]}>Regresar</Text>
          <Icon name="backward" size={30} color="#900" />
        </TouchableOpacity>
      </View>

      

    </View>
  )};
}


const styles = StyleSheet.create({
  contenedor_principal:{
    backgroundColor: "#0D3863",
    flex: 1,
    flexDirection: "column",
    marginBottom: 15

  },
  contenedor_libro:{
    alignItems: "center",
    backgroundColor: "#0D3863",
    // backgroundColor: "black",
    fontFamily: "Roboto",
    flexDirection: "row",
    marginTop: 50
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

  contenedor_regresar_imagen:
  {
    height: 50,
    // marginTop: '100%',
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "black",
    marginTop: 10,

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
    fontSize: 12
  },

  boton_regresar:{
    flex: 1,
    height: "100%",
    backgroundColor: "#0D3843",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly"
  }
});
