import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image, Picker, Alert} from 'react-native';

export class AdminBolumGuncelle extends Component{

	constructor(props){
		super(props);
		this.state = {
        bolumid: "",//Veritabanından çekilecek!
				bolumadi:"", 
				validateName: false,
       	clickability: false,
       	
		}
	}

	componentDidMount = () => {
		 const {bolumID,bolumAdi} =this.props.navigation.state.params;
		 this.setState({bolumadi:bolumAdi,bolumid:bolumID});
	}

	validateName = (text) => {
      
      this.setState({bolumadi: text})

      	alph=/^\s*[a-zA-Z,ç,Ç,ğ,Ğ,ı,İ,ö,Ö,ş,Ş,ü,Ü,\s]+\s*$/
	    if(alph.test(text)) 
	    	  this.setState({validateName: true, bolumadi: text}) 
	    else
	      	this.setState({validateName: false})
      this.disabledButton();
    }

    disabledButton = () => {
      	if(this.state.validateName)
        	this.setState({clickability: false})
      	else
        	this.setState({clickability: true})
    }

    Kaydet = () => {
    let bolum ={
				bolumAdi:this.state.bolumadi,
				bolumID:this.state.bolumid
		}
	
    	//TODO: bolum adi (yukarıdaki bolum nesnesini) apiye gönder ve kayıt işlemini yap

			if(this.state.validateName && this.state.bolumadi != '')
			{
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/Update",{
					method:"put",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body:JSON.stringify(bolum),
				})
	  		.then(()=>{

					Alert.alert("Güncelleme işlemi gerçekleştirildi",
					"Bölüm güncelleme işlemi gerçekleştirildi",[{text:'OK',onPress:()=>{
						this.props.navigation.navigate("AdminBolumIslemleri")
					}}])
			
				 }) 
	  		.catch(err=>alert(err));

				this.props.navigation.navigate('AdminBolumIslemleri') //admin menüye yönlendir.
      	
			}
        else{
        	this.setState({clickability: true})
        	Alert.alert('Hata!', 'Bölüm adı boş geçilemez!')
      	}
    }

	render(){
		
    const { navigate } = this.props.navigation;
    const { bolumId } = this.props.navigation.state.params;

		return (
			<View style={styles.container}>

				<View>
					<Text style={styles.text}>Bölüm Adı:</Text>
	              	<TextInput id='ad' onChangeText={(text) => {this.validateName(text)}}
	                         maxLength={20} 
	                         style={styles.textInput} value = {this.state.bolumadi}/>
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
export default AdminBolumGuncelle;

const styles = StyleSheet.create({
	container: {
    	justifyContent: 'center',
  	},
  	textInput:{
	    width:'96%',
	    borderRadius: 15,
	    borderWidth: 0.5,
	    borderColor: '#f26522', 
	    backgroundColor:'white',
	    fontSize: 15,
	    fontWeight: 'bold',
	    marginLeft: '2%',
	},
  	text:{
    	textAlign:'left', 
    	fontSize: 15,
    	fontWeight: 'bold',
    	paddingLeft: '7%',
    	paddingTop: '5%',
    	paddingBottom: '3%',
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