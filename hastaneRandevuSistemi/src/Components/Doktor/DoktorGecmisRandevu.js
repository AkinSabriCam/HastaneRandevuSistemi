import React, {Component} from 'react';
import {Text, View,ScrollView} from 'react-native';
import moment from 'moment';

export default class DoktorGecmisRandevu extends React.Component {
  constructor(props){
    super(props);
    this.state={
     Randevular:[]
    }
   }
  
  componentDidMount(){
    const{ doktorID} = this.props.navigation.state.params;
    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetOldByDoktorId/"+doktorID)
    .then(data=>data.json())
    .then(result=>this.setState({Randevular:result}))
    .catch(err=>alert(err));

 }
  
  
  render() {
    const randevular = this.state.Randevular.map((rand,ind)=>{
      let tarih = moment(rand.tarih).format('YYYY.MM.DD');
      let saat = moment(rand.saat, 'HHmm').format('HH:mm');
      return(
          <View key={ind}>
          <Text style={styles.bosluk}></Text>
          <Text style={styles.cizgi}>Bekliyor..</Text>
          <Text style = {styles.viewStyle}>Hastane</Text>
          <Text style={styles.infoStyle}>{rand.HastaneAdi}</Text>
          <Text style = {styles.viewStyle}>Klinik</Text>
          <Text style={styles.infoStyle}>{rand.bolumAdi}</Text>
          <Text style = {styles.viewStyle}>Hasta Adı</Text>
          <Text style={styles.infoStyle}>{rand.kullaniciAdi} {rand.kullaniciSoyadi}</Text>
          <Text style = {styles.viewStyle}>Randevu Zamanı</Text>
          <Text style={styles.infoStyle}>
          <Text style={styles.infoText}>{tarih} - {saat}</Text></Text>
          
          </View>
      )
    })

      return (
        <ScrollView>
        <View style={styles.container}>
          {randevular}
        </View>
        </ScrollView>
      )}
}
const styles = {
    container:{
        flex:1,
    },
    viewStyle:{
      backgroundColor:"transparent",
      flex:0.05,
      flexDirection:"row",
      alignItems:"center",
      borderBottomWidth:0.3,
      borderBottomColor:"#f26522",
      color:"#f26522",
      fontSize:17
    },
    headerStyle:{
      backgroundColor:"#f26522",
      flex:0.09,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
    },
    headerView:{
      color:"black",
      fontSize:20
    },
    bosluk:{
      flex:0.02
    },
    infoStyle:{
      flex:0.03,
      fontSize:15,
      color:"black",
      fontSize:12
    },
    cizgi:{
      backgroundColor:"#f26522",
      flex:0.007,
    }
    
  
  }  