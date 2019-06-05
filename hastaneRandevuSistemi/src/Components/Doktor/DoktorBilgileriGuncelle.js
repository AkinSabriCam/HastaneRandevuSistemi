import React, {Component} from 'react';
import { Input, CheckBox} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Platform, StyleSheet, Text, TextInput, View, Button, ScrollView, Picker, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';


export default class DoktorBilgileriGuncelle extends Component{
    
    constructor(props){
      super(props);
      this.state = {
        Doktor:{},
        validateText: true,
        validateNumber: true,
        validatePassword: true,
        clickability: false,
      }
    }

    componentDidMount(){
      const { doktorID } = this.props.navigation.state.params; //loginde gelecek
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/GetById/"+doktorID)//Burayı değiştir!!!!!!!
        .then(data=>data.json())
        .then(result=>{
            this.setState({Doktor:result});
        })
        .catch(err=>{console.log(err)});
    }

    validateText = (text) => {
      alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
      if(alph.test(text) && text != ''){
        this.setState({validateText: true})
      }
      else{
        this.setState({validateText: false})
      }
    }
    validateNumber = (text) => {
      if(text != ''){ 
        let doktor = this.state.Doktor;
        doktor.telNo = text.replace(/[^0-9]/g, '');
        this.setState({
          Doktor: doktor,
          validateNumber: true, 
        }); 
      }
      else
        this.setState({validateNumber: false})

    }
    validatePassword = (text) => {  
      if(text != '')
        this.setState({validatePassword: true})
      else
        this.setState({validatePassword: false})

    }

    Guncelle = () => {//Dikkat!!!! güncellemeden sonra doktor id de değişiyor!!!!!!!
         let doktor = {
            doktorID: this.state.Doktor.doktorID,
            TCKN: this.state.Doktor.TCKN,
            sifre: this.state.Doktor.sifre,
            adi: this.state.Doktor.adi,
            soyadi: this.state.Doktor.soyadi,
            cepTelefonu: this.state.Doktor.telNo,
            hastaneID: this.state.Doktor.hastaneID,
            bolumID: this.state.Doktor.bolumID,
        }

        if(!this.state.validatePassword || !this.state.validateNumber || !this.state.validateText)
            Alert.alert('Hata!', 'Lütfen bilgilerinizi eksiksiz doldurunuz!');
        else {
            fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Update", {
            method: 'PUT',
            body: JSON.stringify(doktor),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }})
            .then(() => 
                Alert.alert(
                    "Doktor Bilgileri Güncellendi!", 
                    "Bilgileriniz başarılı bir şekilde güncellenmiştir!",
                    [{text: 'OK', onPress:() => this.props.navigation.navigate('DoktorMenu')}]
                )
            ) 
          .catch(err=>alert("Hata!", "Kullanıcı bilgileri güncellenirken bir hata oluştu!\nLütfen tekrar deneyin!"))
          }
    }

    render(){

      //const { navigate } = this.props.navigation;


      /*let iller=this.state.Iller.map((il,indeks)=>{
            console.log(this.state.Iller);
            return(  
                <Picker.Item key={indeks} value={il.ilID}>{il.ilAdi}</Picker.Item>
            )
         })*/

      return (
        
        <View style={styles.container}>

          <ScrollView>
     

              <Text style={styles.text}>TC Kimlik No:</Text>
              <TextInput id='tckn' style={[styles.textInput, {opacity: 0.8}]} editable = {false} value = {this.state.Doktor.TCKN}/>
              
              <Text style={styles.text}>Şifre:</Text>
              <TextInput secureTextEntry={true} id='sifre' 
                         onChangeText={(text) => {
                                              let doktor = this.state.Doktor;
                                              doktor.sifre = text;
                                              this.setState({Doktor: doktor});
                                              this.validatePassword(text)}}
                         maxLength={20} 
                         style={styles.textInput} value ={this.state.Doktor.sifre}/>
              
              <Text style={styles.text}>Ad:</Text>
              <TextInput id='ad' onChangeText={(text) => {
                                                      let doktor = this.state.Doktor;
                                                      doktor.adi = text;
                                                      this.setState({Doktor: doktor});
                                                      this.validateText(text)}} 
                         maxLength={20} 
                         style={styles.textInput} value ={this.state.Doktor.adi}/>
              
              <Text style={styles.text}>Soyad:</Text>
              <TextInput id='soyad' onChangeText={(text) => {
                                                      let doktor = this.state.Doktor;
                                                      doktor.soyadi = text;
                                                      this.setState({Doktor: doktor});
                                                      this.validateText(text)}}
                         maxLength={20} 
                         style={styles.textInput}  value ={this.state.Doktor.soyadi}/>

              <Text style={styles.text}>Cep Telefonu:</Text>
              <TextInput id='cepTelefonu' onChangeText={(text) => { this.validateNumber(text) }}
                         maxLength={11} keyboardType={'phone-pad'} 
                         style={styles.textInput} value = {this.state.Doktor.telNo}/>   

              <Text style={styles.text}>Hastane:</Text>
              <TextInput id='hastane' style={[styles.textInput, {opacity: 0.8}]} editable = {false} value = {this.state.Doktor.hastaneAdi}/>

              <Text style={styles.text}>Bolum:</Text>
              <TextInput id='bolum' style={[styles.textInput, {opacity: 0.8}]} editable = {false} value = {this.state.Doktor.bolumAdi}/>      

            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={this.state.clickability} 
                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}
                                onPress={() => this.Guncelle()}>
                <Text style={{color:'white'}} >Bilgilerimi Güncelle</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  baslikView: {
    textAlign:'center',
    backgroundColor: '#f26522',   
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  baslik:{
    fontSize:20, 
    color: 'black',
  },
  textInput:{
    width:'98%',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#f26522', 
    backgroundColor:'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  text:{
    textAlign:'left', 
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 15,
  },
  buttonContainer: {
    paddingTop: '5%',
    paddingBottom: '15%',
    flexDirection:'row',
    justifyContent: 'center',
  },
  btn:{
    borderRadius:20,
    backgroundColor:'#f26522',
    width:'60%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxView:{
    flexDirection:'row',
    paddingTop: 15,
  },
  checkBox:{
    paddingLeft: 40,
    flexDirection:'row',
  },
  checkBoxContainer:{
    borderColor: '#f26522',
    borderRadius:15,
    borderWidth: 0.5,
  },
  datetimeText:{
    borderRadius:15,
    borderWidth: 0.5,
    borderColor: '#f26522', 
    backgroundColor:'white',
    width:'66%',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 11,
  },
  viewDateTime:{
    flexDirection:'row',
    paddingTop: 15,
  },
  disabled: {
    opacity: 0.6,
  }
});

