import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert, Picker} from 'react-native';

export class RandevuOnay extends Component{

	constructor(props){
		super(props);
		this.state = {
			kullaniciId: 0,
			Hastane: {},
			Bolum: {},
			Doktor: {},
			tarih: '',
			saat: '',
		}
	}

	componentDidMount = () => {
		const { hastaneId, bolumId, doktorId } = this.props.navigation.state.params; // RandevuAl sayfasından gelen paramaetreler

		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/GetById/"+hastaneId)
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Hastane: result});
      	})
      	.catch(err => alert(err))

      	fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/GetById/"+bolumId)
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Bolum: result});
      	})
      	.catch(err => alert(err))

      	fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/GetById/"+doktorId)
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Doktor: result});
      	})
      	.catch(err => alert(err))

	}

	randevuOnayla = () => {
		//TODO: apiye istek gönder(kullaniciId, doktorId, tarih ve saati gönder)!!!
		//Bilgilendirme mesajı göster ve anasayfaya yönlendir!!!

		const { doktorId, choosenDate, choosenHour,kullaniciId } = this.props.navigation.state.params; // RandevuAl sayfasından gelen paramaetreler
//		let kullaniciId = kullaniciId; //loginden al!!! 

		let randevu = {
			doktorID: doktorId,
			kullaniciID: kullaniciId,
			tarih: choosenDate,
			saat: choosenHour,
			durum: true,
		}

		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Randevular/Add", {
            method: 'POST',
            body: JSON.stringify(randevu),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              }
          }).then((result) => {
          	if (result.ok) {
          		Alert.alert(
				"Randevu Onaylandı!", 
				"Randevunuz başarılı bir şekilde onaylanmıştır",
				[{text: 'OK', onPress:() => this.props.navigation.navigate("HastaMenu")}])
          	}
          	else{
          		Alert.alert(
				"Hata!", 
				"Aynı saat için farklı bir doktordan randevu alınamaz!",
				[{text: 'OK', onPress:() => this.props.navigation.navigate("RandevuAl")}])
          	}
	          	
	          }) 
          .catch(err=>alert("Hata!", "Randevu onaylanırken bir hata oluştu!\nLütfen tekrar deneyin!"))
	}

	render(){

		const { navigate } = this.props.navigation;
		const { choosenDate, choosenHour,kullaniciId } = this.props.navigation.state.params; // RandevuAl sayfasından gelen paramaetreler

		return (
			<View style={styles.container}>

				<View style={styles.randevuView}>
					<Text style={styles.text}>Hastane:</Text>
					<Text style={styles.textBilgi}>{this.state.Hastane.hastaneAdi}</Text>

					<Text style={styles.text}>Bölüm:</Text>
					<Text style={styles.textBilgi}>{this.state.Bolum.bolumAdi}</Text>

					<Text style={styles.text}>Doktor:</Text>
					<Text style={styles.textBilgi}>{this.state.Doktor.adi} {this.state.Doktor.soyadi}</Text>

					<Text style={styles.text}>Randevu Tarihi:</Text>
					<Text style={styles.textBilgi}>{choosenDate}</Text>


					<Text style={styles.text}>Randevu Saati:</Text>
					<Text style={styles.textBilgi}>{choosenHour}</Text>

				</View>

				<View style={styles.buttonContainer}>
	            	<TouchableOpacity style={styles.btn} onPress={() => this.randevuOnayla()}>
              			<Text style={{color:'white'}}>Randevuyu Onayla</Text>
            		</TouchableOpacity>
	            </View>
			</View>
		);
	}

}
export default RandevuOnay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	randevuView:{
		flex: 6,
		borderBottomWidth: 3,
		borderColor: '#f26522',
		paddingTop: '2%',
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
	text:{
	    textAlign:'left', 
	    fontSize: 17,
	    fontWeight: 'bold',
	    paddingLeft: '5%',
	    paddingTop: '5%',
  	},
  	textBilgi:{
		textAlign:'left', 
	    fontSize: 16,
	    fontStyle: 'italic',
	    paddingLeft: '7%',
	    flexWrap: 'wrap',
		alignItems: 'flex-start',
  	},
});