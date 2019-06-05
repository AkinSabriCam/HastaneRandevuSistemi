import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image, Picker, Alert} from 'react-native';

export class AdminYeniHastaneEkleme extends Component{

	constructor(props){
		super(props);
		this.state = {
			Iller:[],
        	Ilceler:[],
        	validateName: false,
        	clickability: true,
        	hastaneAdi: '',
        	ilId: 0,
        	il: '',
        	ilceId: 0,
        	ilce: '',
        	acikAdres: '',
        	ilceEnabled: false,
		}
	}

	componentDidMount = () => {
		//TODO: il ve ilçeleri çek!
		//iller	
   		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Iller: result});
      	})
      	.catch(err => alert(err))
	}

	IlceleriListele = (itemValue, itemIndex) => {
		if(itemIndex !== 0){
			this.setState({ilId: itemValue, ilceEnabled: true, clickability: false}, () => {
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Ilce/GetByIlid/"+itemValue)
				.then(data=>data.json())
	      		.then(result=>{
	          		this.setState({Ilceler: result});
	      		})
	      		.catch(err => alert(err))}
	      	)
		}
	}

	validateName = (text) => {
		this.setState({clickability: false})
	    alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
	    if(alph.test(text) && text != '') 
	    	this.setState({validateName: true, hastaneAdi: text}) 
	    else
	      	this.setState({validateName: false})
    }

    Kaydet = () => {
    	let hastane = {
			hastaneAdi: this.state.hastaneAdi,
			ilId: this.state.ilId,
			ilceId: this.state.ilceId,
			acikAdres: this.state.acikAdres
		}
    	//TODO: hastane adi, il id ve ilce id yi (yukarıdaki hastane nesnesini) apiye gönder ve kayıt işlemini yap

    	if(this.state.validateName && this.state.hastaneAdi != '' && this.state.acikAdres != ''){
    		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Add", {
            method: 'POST',
            body: JSON.stringify(hastane),
            headers: {
              	'Accept': 'application/json',
	            'Content-Type': 'application/json',
		    }
          	}).then(() => 
	          	Alert.alert(
				"Hastane Eklendi!", 
				"Hastane başarılı bir şekilde eklenmiştir!",
				[
					{text: 'OK', onPress:() => this.props.navigation.navigate('AdminHastaneIslemleri')}
				])
			) 
          .catch(err=>alert("Hata!", "Hastane eklenirken bir hata oluştu!\nLütfen tekrar deneyin!"))
    	}
      	else{
        	this.setState({clickability: true})
        	Alert.alert('Hata!', 'Lütfen bilgileri eksiksiz ve hatasız doldurunuz!')
      	}
    }

	render(){
		
		return (
			<View style={styles.container}>

				<View>
					<Text style={styles.text}>Hastane Adı:</Text>
	              	<TextInput id='ad' onChangeText={(text) => this.validateName(text)} 
	                         maxLength={30} 
	                         style={styles.textInput}/>
                </View>         	


                <View>
	                <Text style={styles.text}>İl:</Text>	            

		            <View style={styles.textInput}>
		                <Picker
		                    selectedValue={this.state.ilId}
		                    onValueChange={(itemValue, itemIndex) => this.IlceleriListele(itemValue, itemIndex)}>

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
	                    	selectedValue={this.state.ilceId}
	                    	enabled={this.state.ilceEnabled}
	                    	onValueChange={(itemValue, itemIndex) =>
	                      		this.setState({ilceId: itemValue, ilce: itemValue, clickability: false})
	                    	}>

		                    <Picker.Item label="İlçe Seçiniz..." value="0" /> 
		                    {this.state.Ilceler.map((ilce, index) => {
					        	return (
					        		<Picker.Item key={ilce.ilceID} label={ilce.ilceAdi} value={ilce.ilceID} />	
					        	);																		           	      
					        })}          
	                	</Picker>
	              	</View>

	              	 <View>
		            	<Text style={styles.text}>Açık Adres:</Text>
              			<TextInput id='acikAdres' onChangeText={(text) => this.setState({acikAdres: text})} 
              				maxLength={100} multiline = {true}
                         	style={styles.textInput}/> 
		            </View>

	            </View>

              	<View style={styles.buttonContainer}>
		              <TouchableOpacity disabled={this.state.clickability} 
		                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}
		                                onPress={() => this.Kaydet()}>
		                <Text style={{color:'white'}} >Kaydet</Text>
		              </TouchableOpacity>
            	</View>

			</View>
		);
	}
}
export default AdminYeniHastaneEkleme;

const styles = StyleSheet.create({
	container: {
    	justifyContent: 'center',
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
    	paddingTop: '15%',
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
  	error:{
   		borderColor: 'red',
    	borderWidth: 2,
  	},
  	disabled: {
    	opacity: 0.6,
  	}
});