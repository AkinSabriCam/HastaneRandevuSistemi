import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

export default class AdminRandevuIptalEtme extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          Randevular:[],
      }
  }    

  componentDidMount = () =>{
      const { doktorId } = this.props.navigation.state.params;
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetByDoktorId/"+doktorId)
          .then(data=>data.json())
          .then(result=>{
              this.setState({Randevular: result});
          })
          .catch(err => alert(err))
  }

  iptalEt = (id) => {
      //TODO: iptal için istek yolla
      const { doktorId } = this.props.navigation.state.params;
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/DeleteByDoktor/"+id, {
            method: 'DELETE',
          }).then(() => 
                Alert.alert(
                    'Randevu İptal Edildi!', 
                    'İlgili randevu başarılı bir şekilde iptal edilmiştir!',
                    [{text: 'OK', onPress: () => 
                        fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetByDoktorId/"+doktorId)
                        .then(data=>data.json())
                        .then(result=>{
                            this.setState({Randevular: result});
                        })
                        .catch(err => alert(err))
                    },]
                )) 
          .catch(err=>alert("Hata!", "Randevu iptal edilirken bir hata oluştu!"))
      
  }

  render() {
    const {navigate} = this.props.navigation;

    let randevular = this.state.Randevular.map((randevu, index) => {
        let tarih = moment(randevu.tarih).format('YYYY.MM.DD');
        let saat = moment(randevu.saat, 'HHmm').format('HH:mm');
        return (
          <View key={randevu.randevuID}>
              <Text style={styles.bosluk}></Text>

              <Text style={styles.cizgi}>Bekliyor..</Text>
              
              <Text style = {styles.viewStyle}>Hastane</Text>
              
              <Text style={styles.infoStyle}>{randevu.HastaneAdi}</Text>
              
              <Text style = {styles.viewStyle}>Doktor</Text>
              
              <Text style={styles.infoStyle}>{randevu.doktorAdi} {randevu.doktorSoyadi}</Text>

              <Text style = {styles.viewStyle}>Hasta</Text>
              
              <Text style={styles.infoStyle}>{randevu.kullaniciAdi} {randevu.kullaniciSoyadi}</Text>
              
              <Text style = {styles.viewStyle}>Klinik</Text>
              
              <Text style={styles.infoStyle}>{randevu.bolumAdi}</Text>
              
              <Text style = {styles.viewStyle}>Randevu Zamanı</Text>
              
              <Text style={styles.infoStyle}>
              
              <Text style={styles.infoText}>{tarih} - {saat}</Text></Text>
              
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonStyle} // iptal butonu ile daha sonra aynı sayfada kalması saglanacak.
                                    onPress={()=> this.iptalEt(randevu.randevuID)}> 
                  <Text style={styles.buttonText}>İptal Et</Text>
                  </TouchableOpacity>
              </View>
          </View>
        );
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
    buttonContainer:{
      justifyContent: 'center',
      alignItems:'center',
      paddingTop:'3%',
      paddingBottom: '1%',
    },
    buttonStyle:{
      width: '60%',
      height: 25,
      backgroundColor : "#f26522",
      justifyContent : "center",
      alignItems: "center",
      borderRadius: 12,
    },
    buttonText:{
      color:"black",
    }  
}  