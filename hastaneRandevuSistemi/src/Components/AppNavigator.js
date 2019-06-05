import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import AdminBolumGuncelle from './Admin/AdminBolumGuncelle';
import AdminBolumIslemleri from './Admin/AdminBolumIslemleri';
import AdminDoktorGuncelle from "./Admin/AdminDoktorGuncelle";
import AdminDoktorIslemleri from "./Admin/AdminDoktorIslemleri";
import AdminHastaneGuncelle from './Admin/AdminHastaneGuncelle';
import AdminHastaneIslemleri from './Admin/AdminHastaneIslemleri';
import AdminHastaneyeBolumEkleme from './Admin/AdminHastaneyeBolumEkleme';
import AdminIzinIslemleri from './Admin/AdminIzinIslemleri';
import AdminIzinTarihiSec from './Admin/AdminIzinTarihiSec';
import AdminLogin from './Admin/AdminLogin';
import AdminMenu from './Admin/AdminMenu';
import AdminRandevuIptalEtme from './Admin/AdminRandevuIptalEtme';
import AdminRandevuIslemleri from './Admin/AdminRandevuIslemleri';
import AdminYeniBolumEkleme from './Admin/AdminYeniBolumEkleme';
import AdminYeniDoktor from './Admin/AdminYeniDoktor';
import AdminYeniHastaneEkleme from './Admin/AdminYeniHastaneEkleme';

import DoktorBilgileriGuncelle from './Doktor/DoktorBilgileriGuncelle';
import DoktorGecmisRandevu from './Doktor/DoktorGecmisRandevu';
import DoktorLogin from './Doktor/DoktorLogin';
import DoktorMenu from './Doktor/DoktorMenu';
import DoktorMevcutRandevu from './Doktor/DoktorMevcutRandevu';

import HastaFavoriDoktor from './Hasta/HastaFavoriDoktor';
import HastaGecmisRandevu from './Hasta/HastaGecmisRandevu';
import HastaLogin from './Hasta/HastaLogin';
import HastaMenu from './Hasta/HastaMenu';
import HastaMevcutRandevu from './Hasta/HastaMevcutRandevu';
import HastaneSec from './Hasta/HastaneSec';
import KullaniciBilgileriDuzenle from './Hasta/KullaniciBilgileriDuzenle';
import RandevuAl from './Hasta/RandevuAl';
import RandevuOnay from './Hasta/RandevuOnay';
import TarihSec from './Hasta/TarihSec';
import HastaKayit	 from './Hasta/HastaKayit';


import LoginMenu from "./LoginMenu"


const MainNavigator = createStackNavigator({

	LoginMenu: {
		screen: LoginMenu,
		navigationOptions: {
			header:null,
		}
	},
	// admin
	AdminBolumGuncelle: {
		screen: AdminBolumGuncelle,
		navigationOptions: {
			title: 'Bölüm Güncelle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminBolumIslemleri: {
		screen: AdminBolumIslemleri,
		navigationOptions: {
			title: 'Bölüm İşlemleri',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminDoktorGuncelle: {
		screen: AdminDoktorGuncelle,
		navigationOptions: {
			title: 'Doktor Güncelle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminDoktorIslemleri: {
		screen: AdminDoktorIslemleri,
		navigationOptions: {
			title: 'Doktor İşlemleri',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminHastaneGuncelle: {
		screen: AdminHastaneGuncelle,
		navigationOptions: {
			title: 'Hastane Bilgileri Düzenle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}	
	},
	AdminHastaneIslemleri: {
		screen: AdminHastaneIslemleri,
		navigationOptions: {
			title: 'Hastane İşlemleri',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminHastaneyeBolumEkleme: {
		screen: AdminHastaneyeBolumEkleme,
		navigationOptions: {
			title: 'Hastaneye Bölüm Ekle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminIzinIslemleri: {
		screen: AdminIzinIslemleri,
		navigationOptions: {
			title: 'İzin İşlemleri',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminIzinTarihiSec: {
		screen: AdminIzinTarihiSec,
		navigationOptions: {
			title: 'İzin Tarihi Seç',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminLogin: {
		screen: AdminLogin,
		navigationOptions: {
			header:null,
		}
	},
	AdminMenu: {
		screen: AdminMenu,
		navigationOptions: {
			header:null,
		}
	},
	AdminRandevuIptalEtme: {
		screen: AdminRandevuIptalEtme,
		navigationOptions: {
			title: 'Randevu İptal Etme',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminRandevuIslemleri: {
		screen: AdminRandevuIslemleri,
		navigationOptions: {
			title: 'Randevu İşlemleri',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminYeniBolumEkleme: {
		screen: AdminYeniBolumEkleme,
		navigationOptions: {
			title: 'Yeni Bölüm Ekle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminYeniDoktor: {
		screen: AdminYeniDoktor,
		navigationOptions: {
			title: 'Yeni Doktor Ekle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	AdminYeniHastaneEkleme: {
		screen: AdminYeniHastaneEkleme,
		navigationOptions: {
			title: 'Yeni Hastane Ekle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	// doktor
	DoktorBilgileriGuncelle: {
		screen: DoktorBilgileriGuncelle,
		navigationOptions: {
			title: 'Doktor Bilgileri Düzenle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	DoktorGecmisRandevu: {
		screen: DoktorGecmisRandevu,
		navigationOptions: {
			title: 'Geçmiş Randevularım',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	DoktorLogin: {
		screen: DoktorLogin,
		navigationOptions: {
			header:null,
		}
	},
	DoktorMenu: {
		screen: DoktorMenu,
		navigationOptions: {
			header:null,
		}
	},
	DoktorMevcutRandevu: {
		screen: DoktorMevcutRandevu,
		navigationOptions: {
			title: 'Mevcut Randevularım',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	// hasta
	HastaFavoriDoktor: { 
		screen: HastaFavoriDoktor,
		navigationOptions: {
			title: 'Favorilerim',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	HastaGecmisRandevu: { 
		screen: HastaGecmisRandevu,
		navigationOptions: {
			title: 'Geçmiş Randevularım',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	HastaLogin: {
		screen: HastaLogin,
		navigationOptions: {
			header:null,
		}
	},
	HastaMenu: {
		screen: HastaMenu,
		navigationOptions: {
			header:null,
		}
	},
	HastaMevcutRandevu: { 
		screen: HastaMevcutRandevu,
		navigationOptions: {
			title: 'Mevcut Randevularım',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	HastaKayit: { 
		screen: HastaKayit,
		navigationOptions: {
			title: 'Kullanıcı Kayıt',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	HastaneSec: {
		screen: HastaneSec,
		navigationOptions:{
			title: 'Hastane Seç',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	KullaniciBilgileriDuzenle: { 
		screen: KullaniciBilgileriDuzenle,
		navigationOptions: {
			title: 'Kullanıcı Bilgileri Düzenle',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	RandevuAl: {
		screen: RandevuAl,
		navigationOptions: {
			title: 'Randevu Al',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	RandevuOnay: {
		screen: RandevuOnay,
		navigationOptions: {
			title: 'Randevuyu Onayla',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
	TarihSec: { 
		screen: TarihSec,
		navigationOptions: {
			title: 'Tarih Seç',
			headerStyle: {
				backgroundColor: '#f26522',
			},
		}
	},
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;