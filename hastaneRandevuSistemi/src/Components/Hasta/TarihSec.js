import React, {Component} from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

export class TarihSec extends Component{

	constructor(props){
		super(props);
		this.state = {
			isDateTimePickerVisible: false,
        	choosenDate: 'Tarih Seç',
        	clickability: true,
        	maxDate: new Date(),
        	minDate: new Date(), 
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
    	})
	}

    handlePicker = (datetime) => {
    	let day = moment(datetime).day();
    	if (day == 0 || day == 6) {
    		this.setState({
    			clickability: true,
    			isDateTimePickerVisible: false,
		       	choosenDate: 'Lütfen hafta içi bir gün seçiniz!',
    		})
    	}
    	else{
			const { doktorId,kullaniciId } = this.props.navigation.state.params; // HastaneSec sayfasından gelen paramaetreler

    		this.setState({choosenDate: moment(datetime).format('YYYY-MM-DD') }, () => {
    			fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/Kontrol?kullaniciId="+kullaniciId+"&doktorId="+doktorId+"&tarih="+this.state.choosenDate)
      			.then(result=>{
	      			if (result.ok) {
	          			this.setState({isDateTimePickerVisible: false,clickability: false});      				
	      			}
	      			else{
	      				Alert.alert("dsadsadsa","saadsafa",
	      					[{text:'OK', onPress:()=>{
	      						this.setState({isDateTimePickerVisible: false, clickability: true})
	      					}}])
	      			}
      		})
      		.catch(err => alert(err))
    		})
	   	}	
    }   
    hidePicker = () => {
      this.setState({isDateTimePickerVisible: false})
    }
    showPicker = () => {
      this.setState({isDateTimePickerVisible: true})
    }

	render(){

	    const { navigate } = this.props.navigation;
		const { kullaniciId,ilId, ilceId, hastaneId, bolumId, doktorId } = this.props.navigation.state.params; // HastaneSec sayfasından gelen paramaetreler

		return(
			<View>
				
				<View style={styles.viewDateTime}>

	              	<TouchableOpacity onPress={this.showPicker} style={styles.datetimeText}>
	                	<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>{this.state.choosenDate}</Text>
	              	</TouchableOpacity>
	              	
	              	<DateTimePicker
		                isVisible={this.state.isDateTimePickerVisible}
		                onConfirm={this.handlePicker}
		                onCancel={this.hidePicker}
		                mode={'date'}
                		datePickerModeAndroid={'calendar'}
		                maximumDate={this.state.maxDate}
		                minimumDate={this.state.minDate}
	              	/>

	              	<View style={styles.buttonContainer}>
	              		<TouchableOpacity 
	              			disabled={this.state.clickability} 
	              			onPress={() => 
	              				navigate('RandevuAl', {
	              											ilId: ilId,
	              											ilceId: ilceId,
              												hastaneId: hastaneId, 
			           										bolumId: bolumId, 
			           										doktorId: doktorId,
															choosenDate: this.state.choosenDate,
															kullaniciId:kullaniciId
														})} 
	              			style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
	              			<Text style={{color:'white'}}>İleri</Text>
	              		</TouchableOpacity>
	            	</View>

				</View>
			</View>
		);
	}
} 
export default TarihSec;

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
	disabled:{
	  	opacity: 0.6,
	}
});