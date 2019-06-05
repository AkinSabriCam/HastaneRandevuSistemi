import React, {Component} from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

export class AdminIzinTarihiSec extends Component{

	constructor(props){
		super(props);
		this.state = {
			isBaslangicVisible: false,
			isBitisVisible: false,
        	baslangicTarihi: 'Başlangıç Tarihi',
        	bitisTarihi: 'Bitiş Tarihi',
        	baslangicSaati: '',
        	bitisSaati: '',
        	clickability: true,
        	maxDate: new Date(),
        	minDate: new Date(),
        	minuteInterval: 0,
      		bitisDisabled: true,
		}
	}

	componentDidMount = () => {
		let day = new Date().getDate(); //Current Day
    	let nextMonth = new Date().getMonth() + 1; //Next Month
    	let year = new Date().getFullYear(); //Current Year
    	let hours = new Date().getHours(); //Current Hours
    	let min = new Date().getMinutes(); //Current Minutes
    	let sec = new Date().getSeconds(); //Current Seconds
    	let millisec = new Date().getMilliseconds(); //Current Milliseconds

    	this.setState({
    		maxDate: new Date(year, nextMonth, day, hours, min, sec, millisec),
    		minuteInterval: 30,
    	})
	}

    handlePickerBaslangic = (datetime) => {
    	let day = moment(datetime).day();
		let hours = new Date(datetime).getHours(); //Current Hours
	    let min = new Date(datetime).getMinutes(); //Current Minutes
    	if (day == 0 || day == 6) {
    		this.setState({
    			clickability: true,
    			isBaslangicVisible: false,
		       	baslangicTarihi: 'Lütfen hafta içi bir gün seçiniz!',
    		})
    	}
    	else if(hours < 8 || hours > 17 || hours == 12){
    		this.setState({
    			clickability: true,
    			isBaslangicVisible: false,
    			baslangicTarihi: 'Lütfen mesai saatleri içinde bir saat seçiniz!',
    		})
    	}
    	else if((min > 0 && min < 30) || (min > 30 && min < 59)){
    		this.setState({
    			clickability: true,
    			isBaslangicVisible: false,
    			baslangicTarihi: 'Zaman aralığı 30 dakika olmalıdır!',
    		})
    	}
    	else{
    		let day = new Date(datetime).getDate(); //Current Day
	    	let month = new Date(datetime).getMonth() + 1; //Month
	    	let year = new Date(datetime).getFullYear(); //Current Year
	      	this.setState({
		       	isBaslangicVisible: false,
		       	baslangicTarihi: month < 10 ? year+'-0'+month+'-'+day : year+'-'+month+'-'+day,
		       	baslangicSaati: min < 10 ? hours+':0'+min : hours+':'+min,
		       	bitisDisabled: false,
	   		})
	   	}		
    }   
    handlePickerBitis = (datetime) => {
    	let day = moment(datetime).day();
		let hours = new Date(datetime).getHours(); //Current Hours
	    let min = new Date(datetime).getMinutes(); //Current Minutes
    	if (day == 0 || day == 6) {
    		this.setState({
    			clickability: true,
    			isBitisVisible: false,
		       	bitisTarihi: 'Lütfen hafta içi bir gün seçiniz!',
    		})
    	}
    	else if(hours < 8 || hours > 17 || hours == 12){
    		this.setState({
    			clickability: true,
    			isBitisVisible: false,
    			bitisTarihi: 'Lütfen mesai saatleri içinde bir saat seçiniz!',
    		})
    	}
    	else if((min > 0 && min < 30) || (min > 30 && min < 59)){
    		this.setState({
    			clickability: true,
    			isBitisVisible: false,
    			bitisTarihi: 'Zaman aralığı 30 dakika olmalıdır!',
    		})
    	}
    	else{
    		let day = new Date(datetime).getDate(); //Current Day
	    	let month = new Date(datetime).getMonth() + 1; //Month
	    	let year = new Date(datetime).getFullYear(); //Current Year
	      	this.setState({
		       	isBitisVisible: false,
		       	bitisTarihi: month < 10 ? year+'-0'+month+'-'+day : year+'-'+month+'-'+day,
		       	bitisSaati: min < 10 ? hours+':0'+min : hours+':'+min,
		       	clickability: false,
	   		})
	   	}	
    } 
    hidePickerBaslangic = () => {
      this.setState({isBaslangicVisible: false})
    }
    showPickerBaslangic = () => {
      this.setState({isBaslangicVisible: true})
    }

    hidePickerBitis = () => {
      this.setState({isBitisVisible: false})
    }
    showPickerBitis = () => {
      this.setState({isBitisVisible: true})
    }
 
 	izinAta = () => {
		const { doktorId } = this.props.navigation.state.params; // AdminIzinIslemleri sayfasından gelen paramaetreler
 		let izin = {
 			doktorID: doktorId,
 			baslangicTarihi: this.state.baslangicTarihi,
 			bitisTarihi: this.state.bitisTarihi,
 			baslangicSaati: this.state.baslangicSaati,
 			bitisSaati: this.state.bitisSaati,
 		}

 		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Izin/Add", {
            method: 'POST',
            body: JSON.stringify(izin),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              }
          }).then(() => 
	          	Alert.alert(
				"İzin Atandı!", 
				"İzin atama işlemi başarılı bir şekilde onaylanmıştır!",
				[{text: 'OK', onPress:() => this.props.navigation.navigate("AdminMenu")}])) 
          .catch(err=>alert("Hata!", "İzin atanırken bir hata oluştu!\nLütfen tekrar deneyin!"))
 	}

	render(){

	    //const { navigate } = this.props.navigation;
		//const { ilId, ilceId, hastaneId, bolumId, doktorId } = this.props.navigation.state.params; // AdminIzinIslemleri sayfasından gelen paramaetreler

		return(
			<View>
				
				<View style={styles.viewDateTime}>

	              	<TouchableOpacity onPress={this.showPickerBaslangic} style={styles.datetimeText}>
	                	<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{this.state.baslangicTarihi}  {this.state.baslangicSaati}</Text>
	              	</TouchableOpacity>
	              	
	              	<DateTimePicker
		                isVisible={this.state.isBaslangicVisible}
		                onConfirm={this.handlePickerBaslangic}
		                onCancel={this.hidePickerBaslangic}
		                mode={'datetime'}
                		datePickerModeAndroid={'calendar'}
		                maximumDate={this.state.maxDate}
		                minimumDate={this.state.minDate}
	              	/>

	              	<TouchableOpacity onPress={this.showPickerBitis} style={[styles.datetimeText, this.state.bitisDisabled ? styles.enabled:null]} disabled={this.state.bitisDisabled}>
	                	<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{this.state.bitisTarihi}  {this.state.bitisSaati}</Text>
	              	</TouchableOpacity>
	              	
	              	<DateTimePicker
		                isVisible={this.state.isBitisVisible}
		                onConfirm={this.handlePickerBitis}
		                onCancel={this.hidePickerBitis}
		                mode={'datetime'}
                		datePickerModeAndroid={'calendar'}
		                maximumDate={this.state.maxDate}
		                minimumDate={this.state.minDate}
	              	/>


	              	<View style={styles.buttonContainer}>
	              		<TouchableOpacity 
	              			disabled={this.state.clickability} 
	              			onPress={() => this.izinAta()} 
	              			style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
	              			<Text style={{color:'white'}}>Doktora İzin Ata</Text>
	              		</TouchableOpacity>
	              		<Text>{this.state.saat}</Text>
	            	</View>

				</View>
			</View>
		);
	}
} 
export default AdminIzinTarihiSec;

const styles = StyleSheet.create({
  	datetimeText:{
	    borderRadius: 15,
	    borderWidth: 0.5,
	    borderColor: '#f26522', 
	    backgroundColor:'white',
	    width:'80%',
	    height: 60,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginTop: '5%',
	 },
	viewDateTime:{
	    paddingTop: '15%',
	    justifyContent:'center',
	    alignItems:'center',
	},
	baslikView: {
	    textAlign:'center',
	    backgroundColor: '#f26522',   
	    alignItems: 'center',
	    height: '20%',
	    justifyContent: 'center',
	},
	baslik:{
	    fontSize:20, 
	    color: 'black',
	},
	buttonContainer: {
	    paddingTop: '10%',
	    flexDirection:'row',
	    justifyContent: 'center',
	},
	btn:{
	    borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'50%',
	    height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
	disabled: {
	  	opacity: 0.6,
	},
	enabled: {
		opacity: 0.8,
		borderColor: '#d8d8d8',
	},
});