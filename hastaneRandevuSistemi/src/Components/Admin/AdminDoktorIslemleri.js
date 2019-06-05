import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity ,Image,Alert,RefreshControl,ListView} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';

export class AdminDoktorIslemleri extends Component{

	constructor(props){
		super(props);
		this.state = {
			Doktorlar: [],
		}
	}

	componentDidMount(){
		fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Get")
		.then(data=>data.json())
		.then(result=>this.setState({Doktorlar:result}))
		.catch(err=>alert(err))
		}
	DoktorSil(doktorID){
			fetch(`http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Delete?id=${doktorID}`,{
				method:"DELETE"
			})
			.catch(err=>console.log(err));  
			Alert.alert(
			  "Doktor Kayıt Bilgileri Silindi.",
			  "Doktor kaydı başarılı bir şekilde silinmiştir.!",
			[{text: "OK", onPress:()=>fetch("http://hastaneapi-6b885d43.francecentral.cloudapp.azure.com/api/Doktor/Get")
			.then(data=>data.json())
			.then(result=>this.setState({Doktorlar:result}))
			.catch(err=>alert(err))},]
		  );
		}
	
	render(){
		const { navigate }= this.props.navigation;
		let doktorlar = this.state.Doktorlar.map((doktor, index) => {
			return (
				<View key={index} style={styles.doktorView}>
					<TouchableOpacity disabled={true} 
									  style={styles.doktor}>
						<Text style={styles.text}>{doktor.adi} {doktor.soyadi}</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.sil} 
									  onPress={() => this.DoktorSil(doktor.doktorID)}>
	            		<Image source={require('../../img/delete.png')}/>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.guncelle} 
									  onPress={() => navigate("AdminDoktorGuncelle",{doktorID:doktor.doktorID})}>
	            		<Image source={require('../../img/edit.png')}/>					
					</TouchableOpacity>
				</View>				
			);	
		})

		return (
			<View style={styles.container}>

				<ScrollView>									
	            	<View style={styles.yeniDoktorView}>
	            		<TouchableOpacity style={styles.yeniDoktor} onPress={() =>navigate("AdminYeniDoktor")}>
	            			<Image style={{marginRight: '2%'}} source={require('../../img/yeni.png')}/>
	            			<Text style={{color: 'black'}}>Yeni Doktor Ekle</Text>
	            		</TouchableOpacity>
	            	</View>
	            	<View style={doktorlar}>
							{doktorlar}
	            	</View>	
	            </ScrollView>	
			</View>
		);
	}
}
export default AdminDoktorIslemleri;

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
	doktorlar:{
		flex: 6,
	},
	doktorView: {
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingTop: '3%',
		paddingLeft: '2%',
		paddingBottom: '3%',
	},
	doktor:{
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
	yeniDoktorView:{
		flex: 1,
	    paddingTop: '5%',	
	    paddingLeft: '2%',	
	},
	yeniDoktor: {
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