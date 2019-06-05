import React, {Component} from 'react';
import { Input, CheckBox} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Platform, StyleSheet, Text, TextInput, View, Button, ScrollView, Picker, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';
import { tsMethodSignature } from '@babel/types';


export class KullaniciBilgileriDuzenle extends Component{
    
    constructor(props){
      super(props);
      this.state = {
        User: {},

        Iller: [],
        Ilceler: [],
        erkek: true,
        kadin: false,
        isDateTimePickerVisible: false,
        chosenDate: '1997-08-13',
        validateText: false,
        validateNumber: false,
        validatePassword: false,
        validateEmail: false,
        validatedogumtarihi:false,
        mobile:'',
        clickability: true,
        il: '',
        ilce: '',
        ilId: 0,
        ilceId: 0,
        ilceEnabled: false,
      }
    }

    componentDidMount(){
     
        fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Iller: result});
      	})
      	.catch(err => alert(err))
        
          let user = this.state.User;
          user.cinsiyet=true;
          this.setState({User:user})
    }
    erkekSecim = () => {
        let user = this.state.User;
        user.cinsiyet = true;
        this.setState({User: user});
    }
    kadinSecim = () => {
        let user = this.state.User;
        user.cinsiyet = false;
        this.setState({User: user});
    }

    handlePicker = (datetime) => {
      let user = this.state.User;
      user.dogumTarihi = moment(datetime).format('YYYY-MM-DD');
     
      this.setState({
        isDateTimePickerVisible: false,
        User: user,
        validatedogumtarihi:true
      })

    }   
    hidePicker = () => {
      this.setState({isDateTimePickerVisible: false})
    }
    showPicker = () => {
      this.setState({isDateTimePickerVisible: true})
    }

    validateText = (text) => {
      alph=/^[a-z\sa-zA-Z\sA-Z]+$/
      if(alph.test(text) && text != ''){
        this.setState({validateText: true})
      }
      else{
        this.setState({validateText: false})
      }
     
      this.disabledButton();
    }
    validateEmail = (text) => {
      if(text != ''){
        this.setState({validateEmail : true},
        this.disabledButton())
      }
      else{
        this.setState({validateEmail: false})      
      }
      
      
    }
    validateNumber = (text) => {
      if(text !== ''){
        let user = this.state.User;
        user.cepTelefonu = text.replace(/[^0-9]/g, ''); 
        this.setState({
          User: user,
          validateNumber: true, 
        }); 
         
    }
      else
        this.setState({validateNumber: false})

        
    }
    validatePassword = (text) => {  
      if(text != '')
        this.setState({validatePassword: true},
            this.disabledButton())
      else
        this.setState({validatePassword: false})
        this.disabledButton();
      
    }
    disabledButton = () => {
        if(this.state.validatedogumtarihi &&state.validatePassword && this.state.validateNumber && this.state.validateEmail && this.state.validateText &&this.state.validatedogumtarihi) 
          this.setState({clickability: false})
        else
          this.setState({clickability: true})
      }
    GetIlce=(itemValue,itemIndex)=>{
        
        fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Ilce/GetByIlid/"+itemValue)
        .then(data=>data.json())
          .then(result=>{
              this.setState({Ilceler: result})
          })
          .catch(err => alert(err))
        }
    

    Kayıt = () => {
       
        let User=this.state.User;
        User.rolID=2;
        
        
        if(this.state.validatedogumtarihi  && this.state.validatePassword && this.state.validateNumber && this.state.validateEmail && this.state.validateText)
            {
               this.setState({clickability:false},()=>{

                    fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Kullanicilar/Add",{
                        method:"post",
                        body:JSON.stringify(User),
                        headers:{
                            "Accept":"application/json",
                            "Content-type":"application/json"
                        }
                    })
                    .then(()=>{

                        Alert.alert("Kayıt Olma işlemi gerçekleştirildi",
                        "Kullanıcı kayıt olma işlemi gerçekleştirildi",[{text:'OK',onPress:()=>{
                            
                        this.props.navigation.navigate('HastaLogin') //kullanıcı menüye yönlendir.
                    
                        }}])
                    
                    })
                    .catch(err=>{alert(err)})

                })
            }
        else{
           {
               Alert.alert('Hata!', 'Lütfen bilgileri eksizksiz giriniz!')
           }
        }
    }

    render(){

      const { navigate } = this.props.navigation;



      return (
        
        <View style={styles.container}>

          <ScrollView>
            
            <View style={styles.mainView}>

              <Text style={styles.text}>TC Kimlik No:</Text>
              <TextInput id='tckn' style={[styles.textInput, {opacity: 0.8}]} editable = {true} 
                 onChangeText={(text) =>{
                    let user = this.state.User;
                    user.TCKN = text;
                    this.setState({User: user}) 
                    this.validateNumber(text)}} 
               />
              
              <Text style={styles.text}>Şifre:</Text>
              <TextInput secureTextEntry={true} id='sifre' 
                         onChangeText={(text) =>{
                                              let user = this.state.User;
                                              user.sifre = text;
                                              this.setState({User: user}) 
                                              this.validatePassword(text)}} 
                         maxLength={20}
                         style={styles.textInput}/>
              
              <Text style={styles.text}>Ad:</Text>
              <TextInput id='ad' onChangeText={(text) => {
                                              let user = this.state.User;
                                              user.adi = text;
                                              this.setState({User: user})
                                              this.validateText(text)}}
                         maxLength={20} 
                         style={styles.textInput}/>
              
              <Text style={styles.text}>Soyad:</Text>
              <TextInput id='soyad' onChangeText={(text) => {
                                              let user = this.state.User;
                                              user.soyadi = text;
                                              this.setState({User: user})
                                              this.validateText(text)}}
                         maxLength={20} 
                         style={styles.textInput}/>
              
              <Text style={styles.text}>E-Mail:</Text>
              <TextInput id='email' 
                         maxLength={20} 
                         style={styles.textInput}
                         onChangeText={(text) =>{
                            let user = this.state.User;
                            user.email = text;
                            this.setState({User: user}) 
                            this.validateEmail(text)}} 
                            />

              <View style={styles.checkBoxView}>
                  <Text style={styles.text}>Cinsiyet:</Text>
                  
                  <View style={styles.checkBox}>
                    <CheckBox id='erkek' containerStyle={styles.checkBoxContainer} disabled={false} 
                              checkedColor='#f26522' checked={this.state.User.cinsiyet ? true : false} 
                              onPress={this.erkekSecim.bind(this)}  title='Erkek'></CheckBox>

                    <CheckBox id='kadin' containerStyle={styles.checkBoxContainer} disabled={false}
                              checkedColor='#f26522' onPress={this.kadinSecim.bind(this)} 
                              checked={!this.state.User.cinsiyet ? true : false} title='Kadın'></CheckBox>
                  </View>
              </View>
              
              <View style={styles.viewDateTime}>

              <Text style={styles.text}>Doğum Tarihi:</Text>

                <TouchableOpacity onPress={this.showPicker} style={styles.datetimeText}>
                  <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{this.state.User.dogumTarihi}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handlePicker}
                  onCancel={this.hidePicker}
                  mode={'date'}
                  datePickerModeAndroid={'calendar'}
                  maximumDate={new Date()}
                />  
              </View>

              <Text style={styles.text}>Cep Telefonu:</Text>
              <TextInput id='cepTelefonu' 
                          onChangeText={(text) =>{
                            let user = this.state.User;
                            user.telNo = text;
                            this.setState({User: user}) 
                            this.validateNumber(text)}} 
                         maxLength={11} keyboardType={'phone-pad'} 
                         style={styles.textInput} />
              
              <Text style={styles.text}>İl:</Text>

              <View style={styles.textInput}>
                    <Picker
                        selectedValue={this.state.User.ilID}
                        onValueChange={(itemValue, itemIndex) => {
                            let user = this.state.User;
                            user.ilID = itemValue;
                            this.setState({User: user, ilId: itemValue, il: itemValue, ilceEnabled: true} )
                            this.GetIlce(itemValue,itemIndex)
                        }}>

                        <Picker.Item label="İl Seçiniz..." value="0" />           
                        {this.state.Iller.map((il, index) => {
                            return (
                              <Picker.Item key={il.ilID} label={il.ilAdi} value={il.ilID} />                          
                            );
                        })}
                    </Picker>
              </View>

              <Text style={styles.text}>İlçe:</Text>

              <View style={styles.textInput}>
                    <Picker
                        selectedValue={this.state.User.ilceID}
                        enabled={this.state.ilceEnabled}
                        onValueChange={(itemValue, itemIndex) =>{
                            let user = this.state.User;
                            user.ilceID = itemValue;
                            this.setState({User: user, ilceId: itemValue, ilce: itemValue, clickability: false})
                        }}>

                        <Picker.Item label="İlçe Seçiniz..." value="0" /> 
                        {this.state.Ilceler.map((ilce, index) => {
                            return (
                                <Picker.Item key={ilce.ilceID} label={ilce.ilceAdi} value={ilce.ilceID} />  //ile göre ilceleri getir
                            );                                                                              //(burda bütün ilceler geliyor)                              
                        })}          
                    </Picker>
              </View>
              
              <Text style={styles.text}>Açık Adres:</Text>
              <TextInput id='acikAdres' maxLength={100} multiline = {true}
                         style={styles.textInput}
                         onChangeText={(text) =>{
                            let user = this.state.User;
                            user.acikAdres = text;
                            this.setState({User: user}) 
                            }} />         
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={this.state.clickability} onPress={() => this.Kayıt()}
                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
                <Text style={{color:'white'}} >Kayıt Ol</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
        );
    }
}
export default KullaniciBilgileriDuzenle;


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
  mainView: {
    
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
  error:{
    borderColor: 'red',
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.6,
  }
});

