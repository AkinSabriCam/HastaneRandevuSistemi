import React, {Component} from 'react';
import {Text, View,ScrollView,TouchableOpacity,Image,Alert,RefreshControl} from 'react-native';
import { tsConstructorType, isTSExpressionWithTypeArguments } from '@babel/types';

export default class HastaFavoriDoktor extends React.Component {
  constructor(props){
    super(props)
    this.state={
      KullaniciFavorileri:[],
    }
  }
  
  componentDidMount(){
    const { kullaniciId } = this.props.navigation.state.params;

    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Favoriler/GetByUserId/"+kullaniciId)
    .then(data=>data.json())
    .then(result=>{this.setState({KullaniciFavorileri:result})
  })
    .catch(err=>alert(err))
  }
  FavoriKaldir(favoriID){
    fetch(`http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Favoriler/Delete?id=${favoriID}`,{
        method:"DELETE"
    })
    .catch(err=>console.log(err));  
    Alert.alert(
      "Doktorunuz Favorilerden Çıkarıldı.",
      "Doktorunuz başarılı bir şekilde favori doktorlarınız arasından çıkarılmıştır.!",
    [{text: "OK", onPress:()=>fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Favoriler/GetByUserId/"+kullaniciId)
    .then(data=>data.json())
    .then(result=>{this.setState({KullaniciFavorileri:result})
  })
    .catch(err=>alert(err))}] // Daha sonra aynı sayfa guncellemesi saglanacak
  );     
}
    render() {
      const {navigate} = this.props.navigation;
      let Favoriler=this.state.KullaniciFavorileri.map((favori,ind)=>{
        return(
          <View key={ind}style={styles.container}>
          <Text style={styles.bosluk}></Text>
          <Text style={styles.cizgi}>Bilgiler</Text>
          <Text style = {styles.viewStyle}>Hastane</Text>
          <Text style={styles.infoStyle}>{favori.hastaneAdi}</Text>
          <Text style = {styles.viewStyle}>Klinik</Text>
          <Text style={styles.infoStyle}>{favori.bolumAd}</Text>
          <Text style = {styles.viewStyle}>Doktor</Text>
          <Text style={styles.infoStyle}>{favori.doktorAdi} {favori.doktorSoyadi}</Text>
          <TouchableOpacity style={styles.buttonStyle} 
                            onPress={()=>this.FavoriKaldir(favori.favoriID)}>
          <Text style={styles.buttonText}>Doktoru Favorilerimden Çıkar</Text>
          </TouchableOpacity>
          </View>
        )        
        })
      return (
        <ScrollView>
          {Favoriler}
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