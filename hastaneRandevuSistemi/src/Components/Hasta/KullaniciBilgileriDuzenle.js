import React, {Component} from 'react';
import { Input, CheckBox} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Platform, StyleSheet, Text, TextInput, View, Button, ScrollView, Picker, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';


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
        validateText: true,
        validateNumber: true,
        validatePassword: true,
        validateEmail: true,
        mobile:'',
        clickability: false,
        il: '',
        ilce: '',
        ilId: 0,
        ilceId: 0,
        ilceEnabled: false,
        userAd: '',
        userSoyad: '',
      }
    }

    componentDidMount(){
      const { kullaniciId } = this.props.navigation.state.params; // loginden gelecek!
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Kullanicilar/GetById/"+kullaniciId)//Burayı değiştir!!!!!!!
        .then(data=>data.json())
        .then(result=>{
            this.setState({User:result}, () => {
                let user = this.state.User;
                this.setState({
                    il: user.ilAdi, 
                    ilce: user.ilceAdi, 
                    ilId: user.ilID, 
                    ilceId: user.ilceID,
                    userAd: user.adi,
                    userSoyad: user.soyadi,
                  })
              });
        })
        .catch(err=>{console.log(err)});

        //iller  
       fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
        .then(data=>data.json())
        .then(result=>{
            this.setState({Iller: result, ilceEnabled: false});
        })
        .catch(err => alert(err))

    }

    /*erkekSecim = () => {
        let user = this.state.User;
        user.cinsiyet = true;
        this.setState({User: user});
    }
    kadinSecim = () => {
        let user = this.state.User;
        user.cinsiyet = false;
        this.setState({User: user});
    }*/ 

    handlePicker = (datetime) => {
      let user = this.state.User;
      user.dogumTarihi = moment(datetime).format('YYYY-MM-DD'); 
      this.setState({
        isDateTimePickerVisible: false,
        User: user,
      })

    }   
    hidePicker = () => {
      this.setState({isDateTimePickerVisible: false})
    }
    showPicker = () => {
      this.setState({isDateTimePickerVisible: true})
    }

    validateText = (text) => {
      alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
      if(text !== ''){
        if(alph.test(text))
          this.setState({validateText: true})
      }
      else{
        this.setState({validateText: false})
      }
    }
    validateEmail = (text) => {
      if(text !== ''){
        this.setState({validateEmail : true})
      }
      else{
        this.setState({validateEmail: false})      
      }
    }
    validateNumber = (text) => {
      if(text !== ''){
        let user = this.state.User;
        user.telNo = text.replace(/[^0-9]/g, ''); 
        this.setState({
          User: user,
          validateNumber: true, 
        }); 
      }
      else
        this.setState({validateNumber: false})

    }
    validatePassword = (text) => {  
      if(text !== '')
        this.setState({validatePassword: true})
      else
        this.setState({validatePassword: false})

    }

    IlceleriListele = (itemValue, itemIndex) => {
        if(itemIndex !== 0){
            let user = this.state.User;
            user.ilID = itemValue;
            user.ilAdi = this.state.il;
            this.setState({ilId: itemValue, ilce: 'İlçe Seçiniz...', ilceEnabled: true, clickability: false}, () => {
              fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Ilce/GetByIlid/"+itemValue)
              .then(data=>data.json())
              .then(result=>{
                  this.setState({Ilceler: result});
              })
              .catch(err => alert(err))
              }
            )
        }
    }

    Guncelle = () => {
        let user = {
            kullaniID: this.state.User.kullaniID,
            adi: this.state.User.adi,
            soyadi: this.state.User.soyadi,
            dogumTarihi: this.state.User.dogumTarihi,
            cinsiyet: this.state.User.cinsiyet,
            ilID: this.state.User.ilID,
            ilAdi: this.state.User.ilAdi,
            ilceID: this.state.User.ilceID,
            ilceAdi: this.state.User.ilceAdi,
            TCKN: this.state.User.TCKN,
            telNo: this.state.User.telNo,
            email: this.state.User.email,
            acikAdres: this.state.User.acikAdres,
            rolID: this.state.User.rolID,
            sifre: this.state.User.sifre,
        }

        if(this.state.validatePassword && this.state.User.acikAdres != '' && this.state.validateNumber && this.state.validateEmail && this.state.validateText){
            fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Kullanicilar/Update", {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }})
            .then(() => 
                Alert.alert(
                    "Kullanıcı Bilgileri Güncellendi!", 
                    "Kullanıcı bilgileriniz başarılı bir şekilde güncellenmiştir!",
                    [{text: 'OK', onPress:() => this.props.navigation.navigate('HastaMenu')}]
                )
            ) 
          .catch(err=>alert("Hata!", "Kullanıcı bilgileri güncellenirken bir hata oluştu!\nLütfen tekrar deneyin!"))
        }
        else
            Alert.alert('Hata!', 'Lütfen bilgileri eksiksiz giriniz!')
      }

    render(){

      const { navigate } = this.props.navigation;


      /*let iller=this.state.Iller.map((il,indeks)=>{
            console.log(this.state.Iller);
            return(  
                <Picker.Item key={indeks} value={il.ilID}>{il.ilAdi}</Picker.Item>
            )
         })*/

      return (
        
        <View style={styles.container}>

          <ScrollView>
            
            <View style={styles.mainView}>

              <Text style={styles.text}>TC Kimlik No:</Text>
              <TextInput id='tckn' style={[styles.textInput, {opacity: 0.8}]} editable = {false} value = {this.state.User.TCKN}/>
              
              <Text style={styles.text}>Şifre:</Text>
              <TextInput secureTextEntry={true} id='sifre' 
                         onChangeText={(text) =>{
                                              let user = this.state.User;
                                              user.sifre = text;
                                              this.setState({User: user}) 
                                              this.validatePassword(text)}} 
                         maxLength={20}
                         style={styles.textInput} value = {this.state.User.sifre}/>
              
              <Text style={styles.text}>Ad:</Text>
              <TextInput id='ad' onChangeText={(text) => {
                                              let user = this.state.User;
                                              user.adi = text;
                                              this.setState({User: user})
                                              this.validateText(text)}}
                         maxLength={20} 
                         style={styles.textInput} value = {this.state.User.adi}/>
              
              <Text style={styles.text}>Soyad:</Text>
              <TextInput id='soyad' onChangeText={(text) => {
                                              let user = this.state.User;
                                              user.soyadi = text;
                                              this.setState({User: user})
                                              this.validateText(text)}}
                         maxLength={20} 
                         style={styles.textInput}  value = {this.state.User.soyadi}/>
              
              <Text style={styles.text}>E-Mail:</Text>
              <TextInput id='email' onChangeText={(text) => {
                                              let user = this.state.User;
                                              user.email = text;
                                              this.setState({User: user}) 
                                              this.validateEmail(text)}}
                         maxLength={50} 
                         style={styles.textInput}  value = {this.state.User.email}/>

              <View style={styles.checkBoxView}>
                  <Text style={styles.text}>Cinsiyet:</Text>
                  
                  <View style={styles.checkBox}>
                    <CheckBox id='erkek' containerStyle={styles.checkBoxContainer} disabled={true} 
                              checkedColor='#f26522' checked={this.state.User.cinsiyet ? true : false} 
                              /*onPress={this.erkekSecim.bind(this)}*/ title='Erkek'></CheckBox>

                    <CheckBox id='kadin' containerStyle={styles.checkBoxContainer} disabled={true}
                              checkedColor='#f26522' /*onPress={this.kadinSecim.bind(this)}*/ 
                              checked={!this.state.User.cinsiyet ? true : false} title='Kadın'></CheckBox>
                  </View>
              </View>
              
              <View style={styles.viewDateTime}>

              <Text style={styles.text}>Doğum Tarihi:</Text>

                <TouchableOpacity onPress={this.showPicker} style={styles.datetimeText}>
                  <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{moment(this.state.User.dogumTarihi).format('YYYY-MM-DD')}</Text>
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
              <TextInput id='cepTelefonu' onChangeText={(text) => this.validateNumber(text)}
                         maxLength={11} keyboardType={'phone-pad'} 
                         style={styles.textInput} value = {this.state.User.telNo}/>
              
              <Text style={styles.text}>İl:</Text>

              <View style={styles.textInput}>
                   
                  <Picker
                      selectedValue={this.state.ilId}
                      //style={styles.picker}
                      mode='dropdown'
                      onValueChange={(itemValue, itemIndex) => this.IlceleriListele(itemValue, itemIndex)} >

                      <Picker.Item key={this.state.ilId} label={this.state.il} value={this.state.ilId} />
                      {this.state.Iller.map((il, index) => {
                          return (
                             <Picker.Item key={il.ilID} label={il.ilAdi} value={il.ilID}/>
                          );
                      })}          
                  </Picker>

              </View>

              <Text style={styles.text}>İlçe:</Text>

              <View style={styles.textInput}>
                    <Picker
                        selectedValue={this.state.ilceId}
                        //style={styles.picker}
                        enabled={this.state.ilceEnabled}
                        mode='dropdown'
                          onValueChange={(itemValue, itemIndex) => {
                                                        let user = this.state.User;
                                                        user.ilceID = itemValue;
                                                        user.ilceAdi = this.state.ilce;
                                                        this.setState({ilceId: itemValue, clickability: false})}} >

                          <Picker.Item key={this.state.ilceId} label={this.state.ilce} value={this.state.ilceId} />
                          {this.state.Ilceler.map((ilce, index) => {
                              return (
                                 <Picker.Item key={ilce.ilceID} label={ilce.ilceAdi} value={ilce.ilceID}/>
                              );
                          })}          
                    </Picker>  
              </View>
              
              <Text style={styles.text}>Açık Adres:</Text>
              <TextInput id='acikAdres' maxLength={100} multiline = {true}
                         onChangeText={(text) =>{
                                              let user = this.state.User;
                                              user.acikAdres = text;
                                              this.setState({User: user})}} 
                         style={styles.textInput} value = {this.state.User.acikAdres}/>         
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={this.state.clickability} onPress={() => this.Guncelle()}
                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
                <Text style={{color:'white'}} >Bilgilerimi Güncelle</Text>
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

