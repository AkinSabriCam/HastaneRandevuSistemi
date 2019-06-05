import React, {Component} from 'react';
import {TouchableOpacity,Image, Text, View} from 'react-native';

export default class LoginMenu extends React.Component {
    constructor(props){
      super(props)
      this.state={
        hastaneler:[]
      }
    }
  componentDidMount(){

    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Get")
    .then(data=>data.json())
    .then(data=>{this.setState({hastaneler:data})
          var hast =this.state.hastaneler;   
      
  })
    .catch(err=>alert(err))

  }
  
  render() {

    const {navigate} =this.props.navigation;
    return (
      <View style={styles.container}>
      <View style = {styles.styleLogo}>
          <Image 
            style = {styles.imageStyle} 
            resizeMode = "contain" 
            source = {require("../img/logo.png")} />
        </View>
      <View style={styles.infoBox}>
      </View>
      <View style={styles.menuContainer}>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("DoktorLogin")}>
              <Image
              source={require('../img/doktor.png')}
              />
              <Text style={styles.menuTextColor} > Doktor Girişi </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("HastaLogin")}>
              <Image
              source={require('../img/hasta.png')}
              />
              <Text style={styles.menuTextColor} > Hasta Girişi </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminLogin")}
              >
              <Image
              source={require('../img/admin.png')}
              />
              <Text style={styles.menuTextColor} > Admin Girişi </Text>
          </TouchableOpacity>
      </View>
      </View>
      
    );
  }
}

const styles = {
  menuButtonStyle:{
    backgroundColor : "#f26522",
    justifyContent : "center",
    alignItems: "center",
    padding:5,
    margin:10,
    borderRadius: 20,
  },
  menuTextColor:{
    color:"black"
  },
  menuContainer:{
    flex:1,
  },
  imageStyle:{
    flex: 1, 
    width: null, 
    height: null
  },
  styleLogo:{
    flex:0.9,
  },
  container:{
    padding:50,
    flex:1
  },
  infoBox:{
    flex:0.15,
    alignItems:"center",
    color:"black"
  },
  infoBoxText:{
    color:"black"
  },

}