import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity ,Image,Alert} from 'react-native';

export class AdminBolumIslemleri extends Component{

	constructor(props){
		super(props);
		this.state = {
			bolumler: []
		}
	}

	componentDidMount = () => {
	  fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/Get")
	  .then(data=>data.json())
	  .then(result=>this.setState({bolumler:result}))
	  .catch(err=>alert(err));
	}

	Sil = (id) => {
	   
		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/Delete/"+id,{
			method:"delete"
		})
	    .then(()=>{

		 Alert.alert("Bölüm Silindi!",
		 "Bölüm silme işlemi başarılı bir şekilde gerçekleşmiştir!",[{text:'OK',onPress:()=>{

			fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Bolum/Get")
	  		.then(data=>data.json())
	  		.then(result=>this.setState({bolumler:result}))
	  		.catch(err=>alert(err));

		 }}])
 
		}) 
	
	}	
	

	render(){

		const { navigate } = this.props.navigation;

		let bolumler = this.state.bolumler.map((bolum, index) => {
			return (
				<View key={index} style={styles.bolumView}>
					<TouchableOpacity disabled={true} 
									  style={styles.bolum}>
						<Text style={styles.text}>{bolum.bolumAdi}</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.sil} onPress={() => this.Sil(bolum.bolumID)}>
	            		<Image source={require('../../img/delete.png')}/>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.guncelle} 
									  onPress={() => navigate('AdminBolumGuncelle', {bolumID: bolum.bolumID, bolumAdi: bolum.bolumAdi})}>
	            		<Image source={require('../../img/edit.png')}/>					
					</TouchableOpacity>
				</View>				
			);	
		})

		return (
			<View style={styles.container}>

				<ScrollView>									

	            	<View style={styles.yeniBolumView}>
	            		<TouchableOpacity style={styles.yeniBolum} onPress={() => navigate('AdminYeniBolumEkleme')}>

	            			<Image style={{marginRight: '2%'}} source={require('../../img/yeni.png')}/>
	            			<Text style={{color: 'black'}}>Yeni Bölüm</Text>
	            		
	            		</TouchableOpacity>

	            		<TouchableOpacity style={styles.hastaneyeBolum} onPress={() => navigate('AdminHastaneyeBolumEkleme')}>

	            			<Image style={{marginRight: '2%'}} source={require('../../img/yeni.png')}/>
	            			<Text style={{color: 'black'}}>Hastaneye Yeni Bölüm</Text>
	            		
	            		</TouchableOpacity>
	            	</View>

            	
	            	<View style={bolumler}>
	            		{bolumler}
	            	</View>	
	            </ScrollView>	
			</View>
		);
	}
}
export default AdminBolumIslemleri;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	baslikView: {
		flex: 5,
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
	bolumler:{
		flex: 6,
	},
	bolumView: {
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingTop: '3%',
		paddingLeft: '2%',
		paddingBottom: '3%',
	},
	bolum:{
		borderRadius: 15,
	    borderWidth: 0.5,
	    borderColor: '#f26522', 
	    backgroundColor:'white',
	    width:'62%',
	    height: 50,
	    justifyContent: 'center',
	},
	sil:{
		borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'16%',
	    height: 48,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginLeft: '2%',
	},
	guncelle: {
		borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'16%',
	    height: 48,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginLeft: '2%',
	},
	yeniBolumView:{
		flex: 1,
	    paddingTop: '5%',	
	    paddingLeft: '2%',
	    flexDirection: 'row',	
	},
	yeniBolum: {
		borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'35%',
	    height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	},
	hastaneyeBolum: {
		borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'55%',
	    height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	    marginLeft: '3%',
	},
	text:{
    	textAlign:'left', 
    	fontSize: 13,
    	paddingLeft:'2%',
  	},
});