import React, {Component} from 'react';
import { Input, CheckBox} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Platform, StyleSheet, Text, TextInput, View, Button, ScrollView, Picker, TouchableOpacity,Alert} from 'react-native';
import moment from 'moment';


export default class AdminDoktorGuncelle extends Component{
    
    constructor(props){
      super(props);
      this.state = {
        Doktor:{},
        hastaneler: [],
        bolumler:[],
        Iller:[],
        Ilceler:[],
        validateText: true,
        validatePassword: true,
        clickability: true,
        hastaneId:'',
        bolumId:'',
        hastaneAdi: '',
        hastane:'',
        bolum:'',
        il: '',
        ilce: '',
        ilId: 0,
        ilceId: 0,
        cepTelefonu:'',
        validateNumber: true,
        hastaneEnabled: false,
        bolumEnabled: false,
        doktorEnabled: false,
      }
      this.Guncelle = this.Guncelle.bind(this);
    }
    componentDidMount(){
      const {doktorID} = this.props.navigation.state.params;//admin doktor işlemleri
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/GetById/"+doktorID)
        .then(data=>data.json())
        .then(result=>{
            this.setState({Doktor:result}, ()=>{
              let doktor = this.state.Doktor;
              this.setState({bolum: doktor.bolumAdi,hastane:doktor.hastaneAdi})
            });
        })
        .catch(err=>{console.log(err)});
      fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
      .then(data=>data.json())
          .then(result=>{
              this.setState({Iller: result});
          })
          .catch(err => alert(err))

    }

    validateText = (text) => {
      this.setState({clickability: false})
      alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
      if(alph.test(text) && text != ''){
        this.setState({validateText: true})
      }
      else{
        this.setState({validateText: false})
      }
    }
    validateNumber = (text) => {
      this.setState({clickability: false})
      if(text != ''){
        let dkt = this.state.Doktor;
        dkt.telNo = text.replace(/[^0-9]/g, '');
        this.setState({Doktor: dkt,validateNumber: true});
      }
      else
        this.setState({validateNumber: false})

    }

    Guncelle = () => {
        if(this.state.validateNumber && this.state.validateText){
            let Doktor={
              doktorID:this.state.Doktor.doktorID,
              TCKN:this.state.Doktor.TCKN,
              adi:this.state.Doktor.adi,
              soyadi:this.state.Doktor.soyadi,
              cepTelefonu: this.state.Doktor.telNo,
              hastaneID:this.state.Doktor.hastaneID,
              bolumID:this.state.Doktor.bolumID,
          }
          fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Update",{
            method:"PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(Doktor),
          })
          .then(()=>{
            Alert.alert("Güncelleme işlemi gerçekleştirildi",
            "Doktor bilgileri güncelleme işlemi başarıyla gerçekleştirildi",
            [{text:'OK',onPress:()=>{
              this.props.navigation.navigate("AdminDoktorIslemleri")
            }}])
        
           }) 
          .catch(err=>alert(err));
          
        }
        else
            Alert.alert('Hata!', 'Lütfen bilgileri eksiksiz giriniz!')
      }

      IlceleriListele = (itemValue, itemIndex) => {
        if(itemIndex !== 0){
          this.setState({il: itemValue, ilId: itemIndex, ilceEnabled: true},()=>{
            fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Ilce/GetByIlid/"+this.state.ilId)
            .then(data=>data.json())
                .then(result=>{
                    this.setState({Ilceler: result});
                })
                .catch(err => alert(err))}
              )
        }
      }
      HastaneleriListele = (itemValue, itemIndex) => {
        if(itemValue !== 0){
          this.setState({ilce: itemValue, ilceId: itemValue, hastaneEnabled: true}, () => {
            fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/GetByLocation/?ilId="+this.state.ilId+"&ilceId="+this.state.ilceId)
            .then(data=>data.json())
                .then(result=>{
                    this.setState({hastaneler: result});
                })
                .catch(err => alert(err))
          })
        }
      }
      
      BolumleriListele = (itemValue, itemIndex)=> {
        if(itemIndex !== 0){
          this.setState({hastane: itemValue, hastaneId: itemValue, bolumEnabled: true}, () => {
            fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/HastaneBolumler/Get/"+this.state.hastaneId)
            .then(data=>data.json())
                .then(result=>{
                    this.setState({bolumler: result});
                })
                .catch(err => alert(err))
          })
        }
      }
    render(){
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>

          <ScrollView>
     
              <Text style={styles.text}>TC Kimlik No:</Text>
              <TextInput style={[styles.textInput, {opacity: 0.8}]} editable = {false} value = {this.state.Doktor.TCKN}/>
              
              <Text style={styles.text}>Ad:</Text>
              <TextInput onChangeText={(text) => {
                                    let dkt = this.state.Doktor;
                                    dkt.adi = text;
                                    this.setState({Doktor: dkt});
                                    this.validateText(text)
                                  }} 
                         maxLength={20} 
                         style={styles.textInput} value ={this.state.Doktor.adi}/>
              
              <Text style={styles.text}>Soyad:</Text>
              <TextInput id='soyad' onChangeText={(text) => {
                                    let dkt = this.state.Doktor;
                                    dkt.soyadi = text;
                                    this.setState({Doktor: dkt});
                                    this.validateText(text)
                                    }} 
                         maxLength={20} 
                         style={styles.textInput}  value ={this.state.Doktor.soyadi}/>

              <Text style={styles.text}>Cep Telefonu:</Text>
              <TextInput id='cepTelefonu' onChangeText={(text) => {
                                          this.validateNumber(text)}
                                          }
                         maxLength={11} keyboardType={'phone-pad'} 
                         style={styles.textInput} value = {this.state.Doktor.telNo}/> 

                <Text style={styles.text}>Hastane İl:</Text>              
                <View style={styles.textInput}>
                    <Picker 
                      selectedValue={this.state.il}
                      mode='dropdown'
                      onValueChange={(itemValue, itemIndex) => this.IlceleriListele(itemValue, itemIndex)} >

                        <Picker.Item label="İl Seçiniz..." value="0" />
                        {this.state.Iller.map((il, index) => {
                    return (
                       <Picker.Item key={il.ilID} label={il.ilAdi} value={il.ilID}/>
                  );
                })}          
                    </Picker>  
                 </View>
                <Text style={styles.text}>Hastane İlçe:</Text>
                 <View style={styles.textInput}>
                 <Picker
                      selectedValue={this.state.ilce}
                      enabled={this.state.ilceEnabled}
                      mode='dropdown'
                        onValueChange={(itemValue, itemIndex) => this.HastaneleriListele(itemValue, itemIndex)} >

                        <Picker.Item label="İlçe Seçiniz..." value="0" />
                        {this.state.Ilceler.map((ilce, index) => {
                    return (
                       <Picker.Item key={ilce.ilceID} label={ilce.ilceAdi} value={ilce.ilceID}/>
                  );
                })}          
                    </Picker>  
                  </View>

                <Text style={styles.text}>Hastane:</Text>
                 <View style={styles.textInput}>
                 <Picker 
                      selectedValue={this.state.hastane}
                      enabled={this.state.hastaneEnabled}
                      mode='dropdown'
                        onValueChange={(itemValue, itemIndex) => this.BolumleriListele(itemValue, itemIndex)} >

                        <Picker.Item label={this.state.hastane} value="0" />
                        {this.state.hastaneler.map((hastane, index) => {
                            return (
                                 <Picker.Item key={hastane.hastaneID} label={hastane.hastaneAdi} value={hastane.hastaneID}/>
                            );
                        })}          
                    </Picker>  
                  </View>

                  <Text style={styles.text}>Doktor Bölüm:</Text>
                  <View style={styles.textInput}>
                    <Picker 
                      selectedValue={this.state.bolumId}
                      enabled={this.state.bolumEnabled}
                      mode='dropdown'
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({bolumId: itemValue, clickability: false})}>
                        
                      <Picker.Item label={this.state.bolum} value="0" />
                        {this.state.bolumler.map((bolum, index) => {
                            return (
                              <Picker.Item key={bolum.bolumID} label={bolum.bolumAdi} value={bolum.bolumID}/>
                            );
                        })}          
                    </Picker>  
                  </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={this.state.clickability}
                                onPress={() => this.Guncelle()}
                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
                <Text style={{color:'white'}} >Güncelle</Text>
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
    paddingBottom: '5%',
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

