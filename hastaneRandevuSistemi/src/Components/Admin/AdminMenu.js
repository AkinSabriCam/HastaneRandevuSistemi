import React, {Component} from 'react';
import {TouchableOpacity,Image, Text, View} from 'react-native';

export default class AdminMenu extends React.Component {
  render() {
    const {navigate} =this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={{flex:0.2}}></View>
      <View style={styles.infoBox}>
      <Text style={styles.infoBoxText}>Hoş Geldiniz,</Text>
      <Text style={styles.infoBoxText}>Administrator</Text>
      </View>
      <View style={styles.menuContainer}>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminHastaneIslemleri")}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > Hastane İşlemleri </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminBolumIslemleri")}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > Bölüm İşlemleri </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminDoktorIslemleri")}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > Doktor İşlemleri </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminRandevuIslemleri")}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > Randevu İşlemleri </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.menuContainer}
              style = {styles.menuButtonStyle}
              onPress={()=>navigate("AdminIzinIslemleri")}>
              <Image
              source={require('../../img/userinfo.png')}
              />
              <Text style={styles.menuTextColor} > İzin İşlemleri </Text>
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