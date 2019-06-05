import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert, Picker} from 'react-native';
import moment from 'moment'

export class RandevuAl extends Component{

	constructor(props){
		super(props);
		this.state = {
			ogledenOnce: [	{id: 1, saat: '08:00', durum: false, choosen: false}, {id: 2, saat: '08:30', durum: false, choosen: false}, 
						  	{id: 3, saat: '09:00', durum: false, choosen: false}, {id: 4, saat: '09:30', durum: false, choosen: false},
						  	{id: 5, saat: '10:00', durum: false, choosen: false}, {id: 6, saat: '10:30', durum: false, choosen: false}, 
						  	{id: 7, saat: '11:00', durum: false, choosen: false}, {id: 8, saat: '11:30', durum: false, choosen: false}],

			ogledenSonra: [	{id: 9, saat: '13:00', durum: false, choosen: false}, {id: 10, saat: '13:30', durum: false, choosen: false}, 
						   	{id: 11, saat: '14:00', durum: false, choosen: false}, {id: 12, saat: '14:30', durum: false, choosen: false},
						  	{id: 13, saat: '15:00', durum: false, choosen: false}, {id: 14, saat: '15:30', durum: false, choosen: false}, 
						  	{id: 15, saat: '16:00', durum: false, choosen: false}, {id: 16, saat: '16.30', durum: false, choosen: false}],
			doluSaatler: [],			  
			clickability: true,
			choosenHour: 'Saat',
			sa:'sasasa'
		}
	}

	componentDidMount = () => {
		const { doktorId, choosenDate,kullaniciId } = this.props.navigation.state.params; // HastaneSec sayfasından gelen paramaetreler	

		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/GetForUser?tarih="+choosenDate+"&doktorId="+doktorId+"&kullaniciId="+kullaniciId)
			.then(data=>data.json())
	        .then(result=>{
	            this.setState({doluSaatler: result}, () => {
	            	const geciciOgledenOnce = [...this.state.ogledenOnce];
					const geciciOgledenSonra = [...this.state.ogledenSonra];

					this.state.doluSaatler.map((saat, ind) => {
						//Alert.alert('awdsadas')
						let timeformat = moment(saat.saat, 'HHmm').format('HH:mm');
						geciciOgledenOnce.map((once, ind) => {
							if(once.saat == timeformat) //TODO: Api'den gelecek veriler(dolu randevu saatleri) ile kontrol edilip disabled durumu false yapılacak!!!	
								once.durum = true;
						})
						geciciOgledenSonra.map((sonra, ind) => {
							if(sonra.saat == timeformat)
								sonra.durum = true;
						})
					})
					this.setState({ogledenOnce: geciciOgledenOnce, ogledenSonra: geciciOgledenSonra})
	            });
	        })
        	.catch(err => alert(err))
	}

	saatSec = (hour, id) => {
		const geciciOgledenOnce = [...this.state.ogledenOnce];
		const geciciOgledenSonra = [...this.state.ogledenSonra];
		
		geciciOgledenOnce.map((once, index) => {
			if(id == once.id)
				once.choosen = true;
			else
				once.choosen = false;
		})
		geciciOgledenSonra.map((sonra,index) => {
			if(id == sonra.id)
				sonra.choosen = true;
			else
				sonra.choosen = false;
		})

		this.setState({
			clickability: false, 
			choosenHour: hour,
			ogledenOnce: geciciOgledenOnce,
			ogledenSonra: geciciOgledenSonra,
		})
	}

	render(){

      	const { navigate } = this.props.navigation;
		const { kullaniciId,ilId, ilceId, hastaneId, bolumId, doktorId, choosenDate } = this.props.navigation.state.params; // HastaneSec sayfasından gelen paramaetreler

		let randevuSaatleriAm = this.state.ogledenOnce.map((saat, ind) => {
			return(
				<TouchableOpacity key={saat.id} disabled={saat.durum} 
								  style={[styles.saatButton, saat.durum ? styles.disabledRandevu : null, saat.choosen ? styles.choosen : null]}
								  onPress={() => this.saatSec(saat.saat, saat.id)}
								  >
					<Text>{saat.saat}</Text>
				</TouchableOpacity>
			);
		});
		let randevuSaatleriPm = this.state.ogledenSonra.map((saat, ind) => {
			return(
				<TouchableOpacity key={saat.id} disabled={saat.durum} 
								  style={[styles.saatButton, saat.durum ? styles.disabledRandevu : null, saat.choosen ? styles.choosen : null]}
								  onPress={() => this.saatSec(saat.saat, saat.id)}
								  >
					<Text>{saat.saat}</Text>
				</TouchableOpacity>
			);
		});

		return(
			<View style={styles.container}>

            	<View style={styles.view}>
					{randevuSaatleriAm}
					<View style={styles.line}/>
					{randevuSaatleriPm}
				</View>

				<View style={styles.buttonContainer}>
	            	<TouchableOpacity 
              			disabled={this.state.clickability} 
              			style={[styles.btn, this.state.clickability ? styles.disabled : null]}
              			onPress={() => 
	              				navigate('RandevuOnay', {
	              											ilId: ilId, 
	              											ilceId: ilceId, 
	          												hastaneId: hastaneId, 
			           										bolumId: bolumId, 
			           										doktorId: doktorId,
	          												choosenDate: choosenDate,
															choosenHour: this.state.choosenHour,
															kullaniciId:kullaniciId
          												})}>
              			<Text style={{color:'white'}}>Randevu Al</Text>
            		</TouchableOpacity>
	            </View>
			</View>
		);
	}
}
export default RandevuAl;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	view: {
		flex: 6,
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingTop: '6%',
	},
	saatButton:{
		borderRadius: 15,
	    borderWidth: 0.5,
	    borderColor: '#f26522', 
	    backgroundColor:'white',
	    width:'22%',
	    height: 60,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginTop: '2%',
	    marginLeft: '2.5%',
	},
	baslikView: {
		flex: 1,
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
		flex: 3,
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
	},
	disabledRandevu:{
		opacity: 0.7,
		borderColor: '#d8d8d8',
	},
	choosen: {
		backgroundColor: '#f44283',
	},
	line:{
		width: '100%',
		height:1,
		marginTop:15,
		marginBottom:5,
		backgroundColor: '#d8d8d8',
	}
});