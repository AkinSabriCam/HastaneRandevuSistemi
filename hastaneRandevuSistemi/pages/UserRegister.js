import React, {Component} from 'react';
import { Input, CheckBox} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Platform, StyleSheet, Text, TextInput, View, Button, ScrollView, Picker, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'axios';
import Axios from 'axios';


export default class UserRegister extends Component{
    
    constructor(props){
      super(props);
      this.state = {
        User:{},
        Iller:[],
        Ilceler:[],
        erkek: false,
        kadin: false,
        isDateTimePickerVisible:false,
        chosenDate:'01-01-1900',
        validateName: true,
        validateSurname: true,
        validateNumber: true,
        mobile:'',
        hastaneler:[]
      }
    }

    componentDidMount(){
      
     /* fetch("http://localhost:50040/api/Hastaneler/Get")//Burayı değiştir!!!!!!!
        .then(data=>data.json())
        .then(result=>{
            this.setState({User:result});
        })
        
        .catch(err=>{console.log(err)});

        // Il ve ilceleri almak için bir fetch daha kullanıyorum
        fetch("http://localhost:50040/api/Iletisim/GetAllCity")//Burayı da!!!!!!!!!
        .then(data=>data.json())
        .then(result=>{
            this.setState({Iller:result.Iller});
            this.setState({Ilceler:result.Ilceler});

        })
        
        .catch(err=>{console.log(err)});*/
        /*
        fetch("http://localhost:54782/api/Hastaneler/Get")
        .then((data)=>data.json())
        .then(result=> alert(result[0]))
        .catch(err=>alert(err));
        */
        Axios.get("http://localhost:54782/api/Hastaneler/Get")
        .then(data=>JSON.stringify(data))
        .then(result=> alert(result))
        .catch(err=>alert(err));
      }

    erkekSecim = () => {
        this.setState({erkek: true, kadin: false});
    }
    kadinSecim = () => {
        this.setState({erkek: false, kadin: true});
    } 

    handlePicker = (datetime) => {
      this.setState({
        isDateTimePickerVisible: false,
        chosenDate: moment(datetime).format('DD MMMM, YYYY')
      })

    }   
    hidePicker = () => {
      this.setState({isDateTimePickerVisible: false})
    }
    showPicker = () => {
      this.setState({isDateTimePickerVisible: true})
    }

    validateName = (text) => {
      alph=/^[a-zA-z]+$/
      if(alph.test(text)){
        this.setState({validateName:true})
      }
      else{
        this.setState({validateName:false})
        btn.editable=false;
      }
    }
    validateSurname = (text) => {
      alph=/^[a-zA-z]+$/
      if(alph.test(text)){
        this.setState({validateSurname:true})
      }
      else{
        this.setState({validateSurname:false})      
        btn.editable=false;
      }
    }
    validateNumber = (text) => {
       this.setState({
        mobile: text.replace(/[^0-9]/g, ''),
      });
    }

    Guncelle = () => {
        let ad=document.getElementById("ad").value;
        let soyad=document.getElementById("soyad").value;
        let username=document.getElementById("kullaniciAd").value;
        let cinsiyet=document.getElementById("cinsiyet").value;
        let ilid=document.getElementById("il").value;
        let ilceid=document.getElementById("ilce").value;
        let adres=document.getElementById("adres").value;
        let tckn=this.state.User.TCKN;
        let rolID=this.state.User.rolID;
        let dogumTarihi = this.state.User.dogumTarihi;    

        let User={
            kullaniciID:kullaniciId,
            ad:ad,
            soyad:soyad,
            cinsiyet:cinsiyet,
            ilID:ilid,
            ilceID:ilceid,
            TCKN:tckn,
            acikAdres:adres,
            rolID:rolID,
            dogumTarihi:dogumTarihi,
        }
      }

    render(){

      /*let iller=this.state.Iller.map((il,indeks)=>{
            console.log(this.state.Iller);
            return(  
                <Picker.Item key={indeks} value={il.ilID}>{il.ilAdi}</Picker.Item>
            )
         })*/

      return (
        
        <View style={styles.container}>

          <ScrollView>

            <View style={styles.baslikView}>
              <Text style={styles.baslik}>Kullanıcı Bilgileri Düzenle</Text>              
            </View>
            
            <Text style={styles.text}>TC Kimlik No:</Text><TextInput id='tckn' style={styles.textInput} editable = {false} /*value = {this.state.User.ad}*//>
            
            <Text style={styles.text}>Ad:</Text><TextInput id='ad' onChangeText={(text) => this.validateName(text)} maxLength={20} style={[styles.textInput, !this.state.validateName ? styles.error:null]} /*value ={this.state.User.ad}*//>
            
            <Text style={styles.text}>Soyad:</Text><TextInput id='soyad' onChangeText={(text) => this.validateSurname(text)} maxLength={20} style={[styles.textInput, !this.state.validateSurname ? styles.error:null]}  /*value ={this.state.User.ad}*//>
            
            <View style={styles.checkBoxView}>
                <Text style={styles.text}>Cinsiyet:</Text>
                <View style={styles.checkBox}>
                  <CheckBox id='erkek' containerStyle={styles.checkBoxContainer} checkedColor='#f26522' checked={this.state.erkek} onPress={this.erkekSecim.bind(this)} title='Erkek'></CheckBox><CheckBox id='kadin' containerStyle={styles.checkBoxContainer} checkedColor='#f26522' onPress={this.kadinSecim.bind(this)} checked={this.state.kadin} title='Kadın'></CheckBox>
                </View>
            </View>
            
            <View style={styles.viewDateTime}>

            <Text style={styles.text}>Doğum Tarihi:</Text>

              <TouchableOpacity onPress={this.showPicker} style={styles.datetimeText}>
                <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{this.state.chosenDate}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode={'date'}
                datePickerModeAndroid={'spinner'}
              />  
            </View>

            <Text style={styles.text}>Cep Telefonu:</Text><TextInput id='cepTelefonu' onChangeText={(text) => this.validateNumber(text)} maxLength={11} keyboardType={'phone-pad'} style={[styles.textInput, !this.state.validateNumber ? styles.error:null]} value = {this.state.mobile}/>
            
            <Text style={styles.text}>İl:</Text>

            <View style={styles.textInput}>
              <Picker
                  selectedValue='Bursa'
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({il: itemIndex})
                  }>
                  <Picker.Item label="Bursa" value="java" />
                  <Picker.Item label="İstanbul" value="js" />           
              </Picker>
            </View>

            <Text style={styles.text}>İlçe:</Text>

            <View style={styles.textInput}>
              <Picker
                  selectedValue='Yıldırım'
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({il: itemIndex})
                  }>
                  <Picker.Item label="Yıldırım" value="java" />
                  <Picker.Item label="Bağcılar" value="js" />             
              </Picker>
            </View>
            
            <Text style={styles.text}>Açık Adres:</Text><TextInput id='acikAdres' maxLength={100} multiline = {true} style={styles.textInput} /*value = {this.state.User.ad}*//>         
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity id='btnGuncelle' style={styles.btn}><Text style={{color:'white'}} >Bilgilerimi Güncelle</Text></TouchableOpacity>
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
  buttonContainer: {
    paddingTop: '5%',
    paddingBottom: '10%',
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
  }
});