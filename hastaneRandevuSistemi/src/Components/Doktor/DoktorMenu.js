import React, {Component} from 'react';
import {TouchableOpacity,Image, Text, View} from 'react-native';

export default class DoktorMenu extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    const {doktorAdi,doktorSoyadi,doktorID}=this.props.navigation.state.params;
    return (

      <View style={styles.container}>
      <View style={{flex:0.2}}></View>
      <View style={styles.infoBox}>
      <Text style={styles.infoBoxText}>Hoş Geldiniz,</Text>
      <Text style={styles.infoBoxText}>{doktorAdi} {doktorSoyadi}</Text>
      </View>
      <View style={styles.menuContainer}>

          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=> navigate("DoktorMevcutRandevu",{doktorID:doktorID})}>
              <Image
              source={require('../../img/calendar.png')}
              />
              <Text style={styles.menuTextColor} > Randevularım </Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=> navigate("DoktorGecmisRandevu",{doktorID:doktorID})}>
              <Image
              source={require('../../img/timer.png')}
              />
              <Text style={styles.menuTextColor} > Geçmiş Randevularım </Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=> navigate("DoktorBilgileriGuncelle",{doktorID:doktorID})}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > Kullanıcı Bilgilerim </Text>
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