import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity ,Image, Alert} from 'react-native';

export class AdminHastaneIslemleri extends Component{

	constructor(props){
		super(props);
		this.state = {
			Hastaneler: [],
		}
	}

	componentDidMount = () => {
		this.fetchInvoice();
	}

	fetchInvoice = () => {
		//TODO: Hastaneleri çek!
		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Get")
		.then(data=>data.json())
        .then(result=>{
            this.setState({Hastaneler: result});
        })
        .catch(err => alert(err))
	}

	Sil = (id) => {
		//TODO: Silinecek hastanenin id sini gönder.

		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Delete/"+id,{
			method:"delete"
		})
	    .then(()=>{

			Alert.alert("Hastane silindi!",
			"Hastane silme işlemi başarılı bir şekilde gerçekleşmiştir!", 
			[{text:'OK', onPress: () => {
				fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Hastaneler/Get")
					.then(data=>data.json())
					.then(result=>this.setState({Hastaneler:result}))
					.catch(err=>alert(err));
			}}])
		})
		.catch(err=>alert("Hata!", "Hastane silinirken bir hata oluştu!\nLütfen tekrar deneyin!"))
	}

	render(){

		const { navigate } = this.props.navigation;

		let hastaneler = this.state.Hastaneler.map((hastane, index) => {
			return (
				<View key={hastane.hastaneID} style={styles.hastaneView}>
					<TouchableOpacity disabled={true} 
									  style={styles.hastane}>
						<Text style={styles.text}>{hastane.hastaneAdi}</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.sil} onPress={() => this.Sil(hastane.hastaneID)}>
	            		<Image source={require('../../img/delete.png')}/>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.guncelle} 
									  onPress={() => navigate('AdminHastaneGuncelle', {hastaneId: hastane.hastaneID})}>
	            		<Image source={require('../../img/edit.png')}/>					
					</TouchableOpacity>
				</View>				
			);	
		})

		return (
			<View style={styles.container}>

				<ScrollView>									

	            	<View style={styles.yeniHastaneView}>
	            		<TouchableOpacity style={styles.yeniHastane} onPress={() => navigate('AdminYeniHastaneEkleme')}>

	            			<Image style={{marginRight: '2%'}} source={require('../../img/yeni.png')}/>
	            			<Text style={{color: 'black'}}>Yeni Hastane</Text>
	            		
	            		</TouchableOpacity>
	            	</View>

            	
	            	<View style={hastaneler}>
	            		{hastaneler}
	            	</View>	
	            </ScrollView>	
			</View>
		);
	}
}
export default AdminHastaneIslemleri;

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
	hastaneler:{
		flex: 6,
	},
	hastaneView: {
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingTop: '3%',
		paddingLeft: '2%',
		paddingBottom: '3%',
	},
	hastane:{
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
	yeniHastaneView:{
		flex: 1,
	    paddingTop: '5%',	
	    paddingLeft: '2%',	
	},
	yeniHastane: {
		borderRadius:20,
	    backgroundColor:'#f26522',
	    width:'50%',
	    height: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	},
	text:{
    	textAlign:'left', 
    	fontSize: 13,
    	paddingLeft:'2%',
  	},
});