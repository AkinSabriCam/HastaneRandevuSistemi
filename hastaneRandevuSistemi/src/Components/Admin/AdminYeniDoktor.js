import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity ,Image, Picker} from 'react-native';

export class AdminYeniDoktor extends Component{

	constructor(props){
		super(props);
		this.state = {
			hastaneler: [],
			bolumler:[],
			Iller:[],
			Ilceler:[],
			validateName: true,
			validateSurname:true,
			validatePassword: true,
			clickability: true,
			hastaneId:'',
			bolumId:'',
			hastaneAdi: '',
			bolum:'',
			il: '',
			ilce: '',
			ilId: 0,
			ilceId: 0,
			cepTelefonu:'',
			validateNumber: true,
			tckn:'',
			hastaneEnabled: false,
			bolumEnabled: false,
			doktorEnabled: false,
			ad:'',
			soyad:'',
			sifre:'',
		}
		this.Kaydet = this.Kaydet.bind(this);
	}

	componentDidMount = () => {
			fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Il/Get")
			.then(data=>data.json())
					.then(result=>{
							this.setState({Iller: result});
					})
					.catch(err => alert(err))
	}

	validateName = (text) => {
	    alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
	    if(alph.test(text) && text != ''){
	      this.setState({validateName: true, ad: text})
	    }
	    else{
	      this.setState({validateName: false})
	    }
      	this.disabledButton();
		}
		validateSurname = (text) => {
	    alph=/^[a-zA-z]+$/
	    if(alph.test(text) && text != ''){
	      this.setState({validateSurname: true, soyad: text})
	    }
	    else{
	      this.setState({validateSurname: false})
	    }
      	this.disabledButton();
		}
		validatePassword = (text) => {  
      if(text != '')
        this.setState({validatePassword: true, sifre:text})
      else
        this.setState({validatePassword: false})

      this.disabledButton();
    }
    validateNumber = (text) => {
        if(text != ''){ 
          this.setState({ validateNumber: true, cepTelefonu:text.replace(/[^0-9]/g)}); 
        }
        else
          this.setState({validateNumber: false})
  
        this.disabledButton();
      }

    disabledButton = () => {
      if(this.state.validateName)
        this.setState({clickability: false})
      else
        this.setState({clickability: true})
    }

    Kaydet = () => {
      let YeniDoktor={
							  TCKN:this.state.tckn,
                adi: this.state.ad,
								soyadi: this.state.soyad,
								sifre:this.state.sifre,
								cepTelefonu:this.state.cepTelefonu,
								hastaneID:this.state.hastaneId,
								bolumID:this.state.bolumId,
			}
			fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Add", {
            method: 'POST',
            body: JSON.stringify(YeniDoktor),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              }
          }).then(data=>data.json)
					.catch(err=>alert("err"))
    	this.props.navigation.navigate('AdminDoktorIslemleri') //admin menüye yönlendir.
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
		return (
                <View style={styles.container}>
			    <ScrollView>
				<View style={styles.hastaneView}>
                    <Text style={styles.text}>TC Kimlik No:</Text>
										<TextInput style={[styles.textInput]}
															 maxLength={11}
															 onChangeText={tckn => this.setState({tckn})}/>
					
                  <Text style={styles.text}>Doktor Ad:</Text>
	              	<TextInput onChangeText={(text) => this.validateName(text)} 
	                         maxLength={20} 
	                         style={styles.textInput} />
                             
                  <Text style={styles.text}>Doktor Soyad:</Text>
	              	<TextInput onChangeText={(text) => this.validateSurname(text)} 
	                         maxLength={20} 
	                         style={styles.textInput}/>

                    <Text style={styles.text}>Şifre:</Text>
										<TextInput onChangeText={(text) => this.validatePassword(text)}
										 					 maxLength={16}
															 style={styles.textInput}/>

                    <Text style={styles.text}>Telefon:</Text>
                    <TextInput onChangeText={(text) => this.validateNumber(text)}
                         maxLength={11} keyboardType={'phone-pad'} 
                         style={styles.textInput}/>
                </View>         	
                <View style={styles.pickerView}>
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

	                  		<Picker.Item label="Hastane Seçiniz..." value="0" />
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
		              		selectedValue={this.state.bolum}
		              		enabled={this.state.bolumEnabled}
		              		mode='dropdown'
											onValueChange={(itemValue, itemIndex) =>
												this.setState({bolum: itemValue, bolumId: itemValue, clickability: false})}>
												
											<Picker.Item label="Bölüm Seçiniz..." value="0" />
	                  		{this.state.bolumler.map((bolum, index) => {
						      	return (
						         	<Picker.Item key={bolum.bolumID} label={bolum.bolumAdi} value={bolum.bolumID}/>
						    	);
						    })}          
	              		</Picker>	
	              	</View>
		
	            </View>

              	<View style={styles.buttonContainer}>
		              <TouchableOpacity disabled={this.state.clickability} 
		                                style={[styles.btn, this.state.clickability ? styles.disabled : null]}
		                                onPress={()=>this.Kaydet()}>
		                <Text style={{color:'white'}} >Kaydet</Text>
		              </TouchableOpacity>
            	</View>

                </ScrollView>
			</View>
            
		);
	}
}
export default AdminYeniDoktor;

const styles = StyleSheet.create({
	container: {
        justifyContent: 'center',
        marginBottom:'2%',
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
});