import React, {Component} from 'react';
import {Text, View,ScrollView,TouchableOpacity} from 'react-native';
import moment from 'moment';

export default class DoktorMevcutRandevu extends React.Component {
   constructor(props){
     super(props);
     this.state={
      Randevular:[]
     }
    }  


   componentDidMount(){
    const { doktorID } = this.props.navigation.state.params; //loginde gelecek

      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetByDoktorId/"+doktorID)
      .then(data=>data.json())
      .then(result=>this.setState({Randevular:result}))
      .catch(err=>alert(err));

   }
   iptal=(randid)=>{
    
    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/DeleteByDoktor/"+randid,
    {
      method:'DELETE'
    })
    .then(()=>{
      const { doktorID } = this.props.navigation.state.params;
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetByDoktorId/"+doktorID)
      .then(data=>data.json())
      .then(result=>this.setState({Randevular:result}))
      .catch(err=>alert(err));


    })
    .catch(err=>alert(err));
   }
   
  render() {

      const {navigate} = this.props.navigation;

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
            <TouchableOpacity style={styles.buttonStyle} // iptal butonu ile daha sonra aynı sayfada kalması saglanacak.
                              onPress={()=>this.iptal(rand.randevuID)} > 
            <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
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
    },
    buttonStyle:{
      backgroundColor : "#f26522",
      justifyContent : "center",
      alignItems: "center",
      borderRadius: 8,
      marginLeft:'80%',
    },
    buttonText:{
      color:"black",
    }
    
  
  }  