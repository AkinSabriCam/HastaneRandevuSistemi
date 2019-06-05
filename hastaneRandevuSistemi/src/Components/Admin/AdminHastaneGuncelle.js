import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image, Picker, Alert} from 'react-native';

export class AdminHastaneGuncelle extends Component{

	constructor(props){
		super(props);
		this.state = {
			Hastane: {},
			il: '',
			ilce: '',
			Iller:[],
        	Ilceler:[],
        	validateName: true,
        	clickability: false,
        	hastaneAdi: '',
        	ilId: 0,
        	ilceId: 0,
        	ilceEnabled: false,
		}
	}

	componentDidMount = () => {
		//TODO: ilgili hastaneyi çek hastane state ine ata!

		const { hastaneId } = this.props.navigation.state.params; // Hastane İşlemleri sayfasından gelen paramaetreler
		//hastaneler
		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/GetById/"+hastaneId)
			.then(data=>data.json())
	        .then(result=>{
	            this.setState({Hastane: result}, () => {
					let hastane = this.state.Hastane;
					this.setState({il: hastane.ilAdi, 
								   ilce: hastane.ilceAdi, 
								   ilId: hastane.ilID, 
								   ilceId: hastane.ilceID,
								   hastaneAdi: hastane.hastaneAdi})
	            })
	        })
        	.catch(err => alert(err))

        //iller	
   		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
		.then(data=>data.json())
      	.then(result=>{
          	this.setState({Iller: result});
      	})
      	.catch(err => alert(err))
          
	}

	validateName = (text) => {
		this.setState({clickability: false})
	    alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
	    if(alph.test(text)) 
	    	this.setState({validateName: true, hastaneAdi: text}) 
	    else
	      	this.setState({validateName: false})
    }

    Kaydet = () => {
    	let hastane = {
    		hastaneID: this.state.Hastane.hastaneID,
			hastaneAdi: this.state.Hastane.hastaneAdi,
			ilId: this.state.ilId,
			ilceId: this.state.ilceId,
			acikAdres: this.state.Hastane.acikAdres,
		}
    	//TODO: hastane adi, il id ve ilce id yi (yukarıdaki hastane nesnesini) apiye gönder ve kayıt işlemini yap

    	if(this.state.validateName && this.state.Hastane.acikAdres != '' && this.state.Hastane.hastaneAdi != '' && this.state.ilId != 0 && this.state.ilceId != 0){
    		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Update", {
            method: 'PUT',
            body: JSON.stringify(hastane),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              }
          }).then(() => 
	          	Alert.alert(
				"Hastane Güncellendi!", 
				"Hastane başarılı bir şekilde güncellenmiştir!",
				[
					{text: 'OK', onPress:() => this.props.navigation.navigate('AdminHastaneIslemleri')}
				])
			) 
          .catch(err=>alert("Hata!", "Hastane güncellenirken bir hata oluştu!\nLütfen tekrar deneyin!"))
    	}
      	else{
        	this.setState({clickability: true})
        	Alert.alert('Hata!', 'Lütfen bilgileri eksiksiz doldurunuz!')
      	}
    }

    IlceleriListele = (itemValue, itemIndex) => {
		if(itemIndex !== 0){
			this.setState({ilId: itemValue, ilce: 'İlçe Seçiniz...', ilceEnabled: true, clickability: false}, () => {
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Ilce/GetByIlid/"+itemValue)
				.then(data=>data.json())
	      		.then(result=>{
	          		this.setState({Ilceler: result});
	      		})
	      		.catch(err => alert(err))}
	      	)
		}
	}

	render(){
		
		//const { navigate } = this.props.navigation;
		//const { hastaneId } = this.props.navigation.state.params; // Hastane İşlemleri sayfasından gelen paramaetreler
		return (
			<View style={styles.container}>

				<View style={styles.hastaneView}>
					<Text style={styles.text}>Hastane Adı:</Text>
	              	<TextInput id='ad' onChangeText={(text) => { 
	              								let hastane = this.state.Hastane;
	              								hastane.hastaneAdi = text;
	              								this.setState({Hastane: hastane});	
	              								this.validateName(text)}}
	                         maxLength={30} 
	                         style={styles.textInput} value = {this.state.Hastane.hastaneAdi}/>
                </View>         	


                <View>
	                <View style={styles.viewPicker}>

	            		<Text style={styles.text}>İl:</Text>
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

		            <View style={styles.viewPicker}>

	            		<Text style={styles.text}>İlçe:</Text>
		              	<Picker
		              		selectedValue={this.state.ilceId}
		              		//style={styles.picker}
		              		enabled={this.state.ilceEnabled}
		              		mode='dropdown'
	                  		onValueChange={(itemValue, itemIndex) => this.setState({ilceId: itemValue, clickability: false})} >

	                  		<Picker.Item key={this.state.ilceId} label={this.state.ilce} value={this.state.ilceId} />
	                  		{this.state.Ilceler.map((ilce, index) => {
						      	return (
						         	<Picker.Item key={ilce.ilceID} label={ilce.ilceAdi} value={ilce.ilceID}/>
						    	);
						    })}          
	              		</Picker>	
	                   	
		            </View>

		            <View>
		            	<Text style={styles.text}>Açık Adres:</Text>
              			<TextInput id='acikAdres' maxLength={100} multiline = {true}
              								onChangeText={(text) => { 
	              								let hastane = this.state.Hastane;
	              								hastane.acikAdres = text;
	              								this.setState({Hastane: hastane})}}
                         	style={styles.textInput} value = {this.state.Hastane.acikAdres}/> 
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
export default AdminHastaneGuncelle;

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
  	viewPicker:{
		paddingTop: '2%',
    	justifyContent:'center',
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