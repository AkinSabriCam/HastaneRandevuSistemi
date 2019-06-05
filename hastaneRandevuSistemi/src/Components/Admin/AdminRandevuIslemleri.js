import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert, Picker} from 'react-native';

export class AdminRandevuIslemleri extends Component{

	constructor(props){
		super(props);
		this.state = {
			hastaneler: [],
			bolumler: [],
			doktorlar: [],
			Iller: [],		
			Ilceler: [],		
			hastane: '',
			bolum: '',
			doktor: '',
			il: '',
			ilce: '',
			ilId: 0,
			ilceId: 0,
			hastaneId: 0,
			bolumId: 0,
			doktorId: 0,
			clickability: true,
			ilceEnabled: false,
			hastaneEnabled: false,
			bolumEnabled: false,
			doktorEnabled: false,
		}
	}

	componentDidMount = () => {
		//TODO: fetch data (illeri getir.)
		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Iller: result});
      	})
      	.catch(err => alert(err))
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
			const { hastaneler } = this.state;
			let hastaneName = hastaneler.find(hastane => hastane.hastaneID === itemValue);
			this.setState({hastane: hastaneName.hastaneAdi, hastaneId: itemValue, bolumEnabled: true}, () => {
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/HastaneBolumler/Get/"+this.state.hastaneId)
				.then(data=>data.json())
	      		.then(result=>{
	          		this.setState({bolumler: result});
	      		})
	      		.catch(err => alert(err))
			})
		}
	}

	DoktorlariListele = (itemValue, itemIndex) => {
		if(itemIndex !== 0){
			const { bolumler } = this.state;
			let bolumName = bolumler.find(bolum => bolum.bolumID === itemValue);
			this.setState({bolum: bolumName.bolumAdi, bolumId: itemValue, doktorEnabled: true}, () => {
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/GetByBolumIdHasId?hastaneid="+this.state.hastaneId+"&bolumid="+this.state.bolumId)
				.then(data=>data.json())
	      		.then(result=>{
	          		this.setState({doktorlar: result});
	      		})
	      		.catch(err => alert(err))
			});
		}
	}

	//TODO: fetch edilen verileri picker a atama
	/*<Picker
	     style={{ flex: 1 }}
	     selectedValue={this.state.pickerSelected}
	     onValueChange={(value, index) => this.onPickerValueChange(value, index)}
	    >
	    {hastaneler.map(hastane =>{
	      return (
	         <Picker.Item key={hastane.id} label={hastane.name} value={hastane.id}/>
	    );
	    })}
   </Picker>*/
   
   //Seçilen label ı almak için
   /*onPickerValueChange = (value) => {
	    const { hastaneler } = this.state;
	    let hastaneName = hastaneler.find(hastane => hastane.id === value);
	    this.setState(
	      {
	        pickerSelected: value,
	        SelectedLabel: hastaneName.name
	      }
	    );
	}*/

	render(){

		const { navigate } = this.props.navigation;

		return(
			<View style={styles.container}>

				<View style={styles.pickers}>

					<View style={styles.viewPicker}>

	            		<Text style={styles.text}>İl:</Text>
		              	<Picker
		              		selectedValue={this.state.ilId}
		              		//style={styles.picker}
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

		            <View style={styles.viewPicker}>

	            		<Text style={styles.text}>İlçe:</Text>
		              	<Picker
		              		selectedValue={this.state.ilceId}
		              		//style={styles.picker}
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

	            	<View style={styles.viewPicker}>

	            		<Text style={styles.text}>Hastane:</Text>
		              	<Picker
		              		selectedValue={this.state.hastaneId}
		              		//style={styles.picker}
		              		enabled={this.state.hastaneEnabled}
		              		mode='dropdown'
	                  		onValueChange={(itemValue, itemIndex) => this.BolumleriListele(itemValue, itemIndex)} >

	                  		<Picker.Item label="Hastane Seçiniz..." value="0" />
	                  		{this.state.hastaneler.map((hastane, index) => {
						      	return (
						         	<Picker.Item key={hastane.hastaneID} label={hastane.hastaneAdi} value={hastane.hastaneID}/>
						    	);
						    })}          
	              		</Picker>	
	                   	
		            </View>

		            <View style={styles.viewPicker}>

	            		<Text style={styles.text}>Bölüm:</Text>
		              	<Picker
		              		selectedValue={this.state.bolumId}
		              		//style={styles.picker}
		              		enabled={this.state.bolumEnabled}
		              		mode='dropdown'
	                  		onValueChange={(itemValue, itemIndex) => this.DoktorlariListele(itemValue, itemIndex)}>
	                  		
	                  		<Picker.Item label="Bölüm Seçiniz..." value="0" />
	                  		{this.state.bolumler.map((bolum, index) => {
						      	return (
						         	<Picker.Item key={bolum.bolumID} label={bolum.bolumAdi} value={bolum.bolumID}/>
						    	);
						    })}          
	              		</Picker>	
	                   	
		            </View>

					<View style={styles.viewPicker}>

	            		<Text style={styles.text}>Doktor:</Text>
		              	<Picker
		              		selectedValue={this.state.doktorId}
		              		//style={styles.picker}
		              		enabled={this.state.doktorEnabled}
		              		mode='dropdown'
	                  		onValueChange={(itemValue, itemIndex) => this.setState({doktor: itemValue, doktorId: itemValue, clickability: false})      			
	                  		}>
	                  		
	                  		<Picker.Item label="Doktor Seçiniz..." value="0" />
	                  		{this.state.doktorlar.map((doktor, index) => {
	                  			let adsoyad = doktor.adi + ' ' + doktor.soyadi
						      	return (
						         	<Picker.Item key={doktor.doktorID} label={adsoyad} value={doktor.doktorID}/>
						    	);
						    })}           
	              		</Picker>	
	                   	
		            </View>
		        </View>

            	<View style={styles.buttonContainer}>
	           		<TouchableOpacity disabled={this.state.clickability} 
	           			onPress={() => 
	           				navigate('AdminRandevuIptalEtme', { doktorId: this.state.doktorId })} 
	           			style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
	           			<Text style={{color:'white'}}>Randevuları Görüntüle</Text>
	           		</TouchableOpacity>
	            </View>

			</View>
		);
	}
}
export default AdminRandevuIslemleri;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pickers: {
		flex: 6,
	},
	text:{
    	textAlign:'left', 
    	fontSize: 15,
    	fontWeight: 'bold',
    	paddingLeft: 15,
    	paddingTop: 15,
  	},
	viewPicker:{
		paddingTop: '2%',
    	justifyContent:'center',
  	},
  	picker: {
  		borderRadius: 15,
	    borderWidth: 0.5,
	    borderColor: '#f26522', 
	    backgroundColor:'white',
	    width:'80%',
	    height: 60,
	    justifyContent: 'center',
	    alignItems: 'center',
  	},
  	buttonContainer: {
  		flex: 1,
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
});