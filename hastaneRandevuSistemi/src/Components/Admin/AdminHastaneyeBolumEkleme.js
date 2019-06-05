import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert, Picker} from 'react-native';

export class AdminHastaneyeBolumEkleme extends Component{

	constructor(props){
		super(props);
		this.state = {
			hastaneler: [],
			bolumler: [],

			hastane: '',
			bolum: '',
			hastaneId: 0,
			bolumId: 0,

			clickability: true,
			bolumEnabled: false,
			hastaneEnabled: false,
		}
	}

	Ekle = () => {
		let hastaneBolum = {
			hastaneID: this.state.hastaneId,
			bolumID: this.state.bolumId,
		}
		//TODO: hastane id ve bolum id yi apiye gönder
	  alert(hastaneBolum.bolumID+"  "+hastaneBolum.hastaneID)

	  fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/HastaneBolumler/Add",{
		  method:"post",
		  headers:{
			  "Accept":"application/json",
			  'Content-Type': 'application/json'
		  },
		  body:JSON.stringify(hastaneBolum)
	  })
	  .then(()=>{
		this.props.navigation.navigate('AdminBolumIslemleri')
	  })
	  .catch(err=>alert(err));
	
	}

	componentDidMount(){

		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Get")
	  .then(data=>data.json())
	  .then(result=>this.setState({hastaneler:result}))
	  .catch(err=>alert(err));

	  fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/Get")
	  .then(data=>data.json())
	  .then(result=>this.setState({bolumler:result}))
	  .catch(err=>alert(err));

	}

	render(){

		const { navigate } = this.props.navigation;

		return (
			<View>

				<View style={styles.viewPicker}>

            		<Text style={styles.text}>Hastane:</Text>
	              	<Picker
	              		selectedValue={this.state.hastane}
	              		mode='dropdown'
                  		onValueChange={(itemValue, itemIndex) => 
                  			this.setState({hastaneId: itemValue, hastane: itemValue, bolumEnabled: true})}>

                  		<Picker.Item label="Hastane Seçiniz..." value="0" />
                  		{this.state.hastaneler.map(hastane =>{
	      					return (
	         					<Picker.Item key={hastane.hastaneID} label={hastane.hastaneAdi} value={hastane.hastaneID}/>
	    					);
	    				})}          
              		</Picker>	
                   	
	            </View>

	            <View style={styles.viewPicker}>

            		<Text style={styles.text}>Bölüm:</Text>
	              	<Picker
	              		selectedValue={this.state.bolum}
	              		enabled={this.state.bolumEnabled}
	              		mode='dropdown'
                  		onValueChange={(itemValue, itemIndex) => 
                  			this.setState({bolumId: itemValue, bolum: itemValue, clickability: false})}>
                  		
                  		<Picker.Item label="Bölüm Seçiniz..." value="0" />
                  		{this.state.bolumler.map(bolum =>{
	      					return (
	         					<Picker.Item key={bolum.bolumID} label={bolum.bolumAdi} value={bolum.bolumID}/>
	    					);
	    				})}        
              		</Picker>	
                   	
	            </View>

	            <View style={styles.buttonContainer}>
	           		<TouchableOpacity disabled={this.state.clickability} 
	           			onPress={() => this.Ekle()} 
	           			style={[styles.btn, this.state.clickability ? styles.disabled : null]}>
	           			<Text style={{color:'white'}}>Ekle</Text>
	           		</TouchableOpacity>
	            </View>

			</View>
		);	
	}
}
export default AdminHastaneyeBolumEkleme;

const styles = StyleSheet.create({
	text:{
    	textAlign:'left', 
    	fontSize: 15,
    	fontWeight: 'bold',
    	paddingLeft: 15,
    	paddingTop: 15,
  	},
	viewPicker:{
    	paddingTop: '15%',
    	justifyContent:'center',
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
  	},
});