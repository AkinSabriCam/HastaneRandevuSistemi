import React, {Component} from 'react';
import {Text, View,ScrollView,TouchableOpacity,Alert} from 'react-native';
import moment from 'moment'


export default class HastaGecmisRandevu extends React.Component {
        constructor(props){
          super(props);
          this.state={
            Randevular:[]
          }
        }
    componentDidMount(){
      const { kullaniciId } = this.props.navigation.state.params;
    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetOldByUserId/"+kullaniciId)
    .then(data=>data.json())
    .then(result=>this.setState({Randevular:result}))
    .catch(err=>alert(err))
    }

    FavoriEkle=(index)=>{
    let YeniFavori={
        kullaniciID:this.state.Randevular[index].kullaniciID,
        doktorID:this.state.Randevular[index].doktorID
          }
        fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Favoriler/Add", {
        method: 'POST',
        body: JSON.stringify(YeniFavori),
        headers: {
            Accept:"application/json",
            'Content-Type': 'application/json'
          }
        })
        .catch((err)=>{alert("error:"+ err)}); 
        Alert.alert(
          "Doktorunuz Favorilere Eklendi.",
          "Doktorunuz başarılı bir şekilde favori doktorlarınız arasına eklenmiştir.!",
        [{text: "OK", onPress:()=>this.props.navigation.navigate("HastaGecmisRandevu")},]
      );
        
      }

  render() {
    const randevular = this.state.Randevular.map((rand,ind)=>{
        let tarih = moment(rand.tarih).format('YYYY.MM.DD');
        let saat = moment(rand.saat, 'HHmm').format('HH:mm');
        return(
            <View key={ind} style={styles.container}>
              <Text style={styles.bosluk}></Text>
              <Text style={styles.cizgi}>Tamamlandı</Text>
              <Text style = {styles.viewStyle}>Hastane</Text>
              <Text style={styles.infoStyle}>{rand.HastaneAdi}</Text>
              <Text style = {styles.viewStyle}>Doktor</Text>
              <Text style={styles.infoStyle}>{rand.doktorAdi} {rand.doktorSoyadi}</Text>
              <Text style = {styles.viewStyle}>Klinik</Text>
              <Text style={styles.infoStyle}>{rand.bolumAdi}</Text>
              <Text style = {styles.viewStyle}>Randevu Zamanı</Text>
              <Text style={styles.infoStyle}>
              <Text style={styles.infoText}>{tarih} - {saat}</Text></Text>
              <TouchableOpacity style={styles.buttonStyle}
                                onPress={()=>this.FavoriEkle(ind)}>
              <Text style={styles.buttonText}>Doktoru Favorilerime Ekle</Text>
              </TouchableOpacity>
            </View>
        )

    })
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
      {randevular}
      </ScrollView>
    )}
   }
  
const styles = {
    container:{
        flex:1,
        marginBottom:"5%"
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
    },
    buttonStyle:{
      backgroundColor : "#f26522",
      justifyContent : "center",
      alignItems: "center",
      borderRadius: 8,
      marginLeft:'45%',
    },
    buttonText:{
      color:"black",
    }
    
  
  }  