/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {TextInput,TouchableOpacity,TouchableHighlight,StyleSheet,Image, Text, View} from 'react-native';

export default class HastaLogin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tckn:"",
      password:"",
      clickability:true
    }
  }
  validateTCKN = (text) => {
    this.setState({
      tckn: text.replace(/[^0-9]/g, '')
    });
    if(text != '')
      this.setState({validatePassword: true, clickability: false})
    else
      this.setState({validatePassword: false, clickability: true})
  }
  validatePassword = (text) => {  
    if(text != '')
      this.setState({password:text,validatePassword: true, clickability: false})
    else
      this.setState({validatePassword: false, clickability: true})
  }
  GirisYap=()=>{
    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Security/Login?tckn="+this.state.tckn+"&password="+this.state.password)
    .then(data=>{
       if(data.ok){
        
         fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Kullanicilar/GetByTcknPassword?tckn="+this.state.tckn+"&password="+this.state.password)
           .then(res=>res.json())
           .then(response=>{
               let user =response;
               
               this.props.navigation.navigate("HastaMenu",{kullaniciID:user.kullaniID,Adi:user.adi,Soyadi:user.soyadi})
           })
           .catch(err=>alert(err));
       }
       else{
         alert("tckn veya şifre hatalı");
       }
    })
    .catch(err=>alert(err))
 }
  render() {
    return (
      <View style = {styles.container}>

      <View style = {styles.boslukTop}></View>
      
        <View style = {styles.styleLogo}>
          <Image 
            style = {styles.imageStyle} 
            resizeMode = "contain" 
            source = {require("../../img/logo.png")} />
        </View>

        <View style = {styles.bosluk}></View>
        
        <View style = {styles.inputContainer}>
          <TextInput 
            placeholder = "TCKN"
            style = {styles.inputStyle}
            onChangeText={(text) => this.validateTCKN(text)}
            maxLength={11}
            keyboardType={'phone-pad'}
            value = {this.state.tckn}
          />
          <TextInput
            placeholder = "***********"
            style = {styles.inputStyle}
            secureTextEntry={true}
            onChangeText={(text) => this.validatePassword(text)} 
            maxLength={16}
          />
        </View>

        <View style = {styles.buttonContainer}> 
            <TouchableOpacity 
              style = {[styles.buttonStyle, this.state.clickability ? styles.disabled : null]}
              onPress={this.GirisYap} 
              disabled={this.state.clickability}>
              <Image
              source={require('../../img/login.png')}
              />
              <Text style={styles.buttonColor} > Giriş Yap </Text>
            </TouchableOpacity>
        </View>

       <TouchableOpacity style={styles.buttonRegister}
       onPress={()=>{this.props.navigation.navigate("HastaKayit")}} >
            <Text style={styles.registerColor}>Sign Up</Text>
        </TouchableOpacity>

        <View style = {styles.bottomBosluk}></View>
      </View>
    );
  }
}
const styles = {
  container:{
    flex:1,
  },
  imageStyle:{
    flex: 1, 
    width: null, 
    height: null
  },
  styleLogo:{
    flex:1.2,
  },
  inputContainer : { 
    flex: 0.6, 
    justifyContent: "space-evenly",
  },
  inputStyle : {
    backgroundColor : "white", 
    padding:5,
    margin: 15,
    borderRadius: 15,
    borderWidth: 0.4,
    borderColor:"#f26522",
  },
  buttonContainer : {
    flex: 0.4,
    justifyContent : "center",
  },
  buttonStyle : {
    backgroundColor : "#f26522",
    justifyContent : "center",
    alignItems: "center",
    padding:10,
    margin:85,
    borderRadius: 20,
    flexDirection :"row"

  },
  disabled: {
    opacity: 0.6,
  },
  buttonColor: {
    color: 'black',
  },
  buttonRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:8,
    borderRadius:30,
  },
  registerColor:{
    color: '#f26522',
  },
  bosluk:{
    flex: 0.2,
  },
  boslukTop:{
    flex: 0.5,
  },
  bottomBosluk:{ 
    flex: 0.1 
  }
}